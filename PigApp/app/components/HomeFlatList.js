import React, { PureComponent } from 'react';
import {
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    Text,
    View,
    Animated,
    Easing,
    ImageBackground
} from 'react-native';

import ajax from '../utils/ajax'
import Toast, { DURATION } from 'react-native-easy-toast'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default class XFFlatList extends PureComponent {

    // 构造器
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            refreshing: false,
            flatHeight: 0,
            indexText: '',
        };
    }

    // 改变value而不需要重新re-render的变量，声明在constructor外面
    currPage = 0;

    // 设置默认输入参数
    static defaultProps = {

    };

    // 组件创建前
    UNSAFE_componentWillMount() {

    }

    // 渲染完成钩子
    componentDidMount() {
        this._getNewsList();
    }

    _getNewsList = () => {
        let _this = this;
        let requestCode = this.props.requestCode;
        let requestHome = this.props.requestHome;

        ajax({
            url: `http://192.168.2.6:19787/api/${requestHome}/${requestCode}`,
            success: (data) => {    
                _this.setState({
                    sourceData: _this.state.refreshing ? data : [..._this.state.sourceData, ...data]

                });
            },
            error: (err) => {
                _this.refs.toast.show('网络请求异常');
                console.info(err);
            },
            complete: () => {
                _this.state.refreshing && _this.setState({ refreshing: false });
            }
        });

    };

    /**
     * 此函数用于为给定的item生成一个不重复的Key。
     * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
     *
     * @param item
     * @param index
     * @private
     */
    _keyExtractor = (item, index) => index + '';

    /**
     * 使用箭头函数防止不必要的re-render；
     *
     * @param item
     * @private
     */
    _onPressItem = (item) => {

        this.setState({
            selected: item.id
        });

        // 跳转视频详情页面
        if (item['Isvideo']==1) {
            this.props.navigation.push('VideoDetail', { item });
            return
        }

        // 跳转新闻详情页面
        this.props.navigation.push('NewsDetailStack', { item });


    };

    // 跳转到指定位置
    _doActionToItem = () => {
        // viewPosition: 指定选定行显示的位置，0代表top，0.5代表middle，1代表bottom
        this.flatList.scrollToIndex({ viewPosition: 0, index: this.state.indexText });
    };

    // 跳转到内容最底端
    _doActionToBottom = () => {
        this.flatList.scrollToEnd();
    };

    // Header布局
    /*_renderHeader = () => (
     <HomeHeader navigation={ this.props.navigation } />
     );*/

    // 空布局
    _renderEmptyView = () => (
        <View style={{ height: this.state.flatHeight, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./../../assets/images/list_placeholder.png')} resizeMode={'contain'} style={{ width: 80, height: 60 }} />
        </View>
    );

    // Footer布局
    _renderFooter = () => {
        let len = this.state.sourceData.length;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: len < 1 ? 0 : 40 }}>
                <Image source={require('./../../assets/images/i_loading.gif')} resizeMode={'contain'} style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>正在加载...</Text>
            </View>
        )
    };

    // 自定义分割线
    _renderItemSeparatorComponent = ({ highlighted }) => (
        <View style={{ height: 1, backgroundColor: '#e6e6e6' }} />
    );

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({ refreshing: true }); //开始刷新
        this.currPage = 0;
        this._getNewsList();
    };

    // 上拉加载更多
    _onEndReached = () => {
        this._getNewsList();
    };


    _renderItem = ({ item }) => {
        return (
            <FlatListItem
                item={item}
                onPressItem={this._onPressItem}
                selected={this.state.selected === item.id}
            />
        );
    };

    _setFlatListHeight = (e) => {
        let height = e.nativeEvent.layout.height;
        if (this.state.flatHeight < height) {
            this.setState({ flatHeight: height })
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref={ref => this.flatList = ref}
                    data={this.state.sourceData}
                    extraData={this.state.selected}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    // 初始加载的条数，不会被卸载
                    initialNumToRender={20}
                    // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                    onEndReachedThreshold={0.5}
                    // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
                    onEndReached={this._onEndReached}
                    //ListHeaderComponent={ this._renderHeader }
                    ListFooterComponent={this._renderFooter}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    ListEmptyComponent={this._renderEmptyView}
                    onLayout={this._setFlatListHeight}
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
                getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index + 50, index } )}
                />
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='center'
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />
            </View>

        );
    }

}

// 根据数据返回不同布局的item
class FlatListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        let item = this.props.item;
        // 判断是否是三图布局
        let isThreePic = item['Isimage'];
        // 判断是否是视频布局
        let isVideo = item['Isvideo'];
        let images=[
            {image:item.Image1},
            {image:item.Image2},
            {image:item.Image3},
        ]

        if (isThreePic==1) {
            return (
                <TouchableOpacity
                    {...this.props}
                    onPress={this._onPress}
                    style={styles.picItem}
                    activeOpacity={.8}
                >
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item.Title}</Text>

                        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
                            <View />
                            {
                                images.map((imgItem, index) => (
                                    <Image source={{ uri: imgItem.image }} key={index + ''} style={{ width: screenWidth * .32, height: 80,borderRadius:2 }} />
                                )
                                )
                            }
                              {/* <Image source={{ uri: item.Image1 }}  style={{ width: screenWidth * .3, height: 80 }} />
                              <Image source={{ uri: item.Image2 }}  style={{ width: screenWidth * .3, height: 80 }} />
                              <Image source={{ uri: item.Image3 }}  style={{ width: screenWidth * .3, height: 80 }} /> */}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ marginRight: 16 }}>{item.Source}</Text>
                                <Text>{item.Browse}看过</Text>
                                {/* <Text style={{ marginRight: 6 }}>{item.replyCount}跟帖</Text> */}
                            </View>
                            {/* <Text style={{ color: '#ccc', fontSize: 18 }}>x</Text> */}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        if (isVideo == 1) {
            return (
                <TouchableOpacity
                    {...this.props}
                    onPress={this._onPress}
                    style={styles.picItem}
                    activeOpacity={.8}
                >
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item.Title}</Text>
                        <ImageBackground source={{ uri: item.Videoimage }} resizeMode={'cover'} style={{ height: 180, marginVertical: 6, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./../../assets/images/i_play.png')} resizeMode={'contain'} style={{ width: 18, height: 18, marginLeft: 3 }} />
                            </View>
                        </ImageBackground>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ marginRight: 16 }}>{item.Source}</Text>
                                <Text>{item.Browse}看过</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={styles.item}
                activeOpacity={.8}
            >
                <View style={{ width: screenWidth * .63, height: 120, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item.Title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ marginRight: 16 }}>{item.Source}</Text>
                            <Text>{item.Browse}看过</Text>
                            {/* <Text>{item.replyCount}跟帖</Text> */}
                        </View>
                        {/* <Text style={{ color: '#ccc', fontSize: 18 }}>x</Text> */}
                    </View>
                </View>
                <Image source={{ uri: item.Photo }} style={{ width: screenWidth * .4, height: 90 }} />
            </TouchableOpacity>
        );


    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7
    },
    picItem: {
        padding: 7
    }

});