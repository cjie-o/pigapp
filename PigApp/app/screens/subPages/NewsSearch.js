/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    Alert,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import ajax from '../../utils/ajax'
import Toast, { DURATION } from 'react-native-easy-toast'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class NewsSearch extends PureComponent {

    // 构造器
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: '搜索',
            isPostList: false, //是否搜索
            keyword: '',//搜索关键字
            searchHistory: [],// 搜索历史数组
            hotTagsArr: [],// 热门搜索标签数组
        };
    }
    componentDidMount() {
        this._getHotWords()
    }
    componentWillMount() { }

    //获取搜索列表数据
    _getHotWords() {
        ModalIndicator.show('请求中...')
        let params = '{"data":{}}'
        this._post('common/v2/campus/getHotWords', {},
            params, true, data => {
                ModalIndicator.hide()
                if (data.code == 0) {
                    console.log('hotTagsArr: ' + data.data)
                    console.log('hotTagsArr: ' + data.data.hot_words)
                    if (!_.isEmpty(data.data.hot_words)) {
                        this.setState({
                            hotTagsArr: data.data.hot_words,
                        })
                    } else {
                        this.setState({
                            hotTagsArr: [],
                        })
                    }
                } else {
                    _showModalMessage(this.props.navigation, data.msg);
                }
            }, err => {
                ModalIndicator.hide()
                console.log('err: ', err)
            })
    }

    //关键字改变
    onChanegeTextKeyword(Val) {
        let keys = {};
        //输入的关键字去空格空字符
        let newVal = Val.replace(/(^\s*)|(\s*$)/g, "")
        if (!_.isEmpty(newVal)) {
            keys = {
                keyword: newVal
            };
            this.setState({ isPostList: true })
        } else {
            Toast.message('请输入搜索关键字', null, 'center')
        }
        this.setState({ keyword: keys });
    }

    //历史和热门标签值赋值输入框
    _setValues(item) {
        this.setState({ value: item })
    }

    //聚焦
    _onFous(v) {
        if (v.nativeEvent.target) {
            this.setState({ isPostList: false })
        }
    }

    //删除历史搜索数据
    _deleteHistory() {
        // 判断是否有本地搜索历史
        if (this.state.searchHistory.length > 0) {
            Alert.alert(
                '提示',
                '确定清除所有历史搜索记录吗？',
                [
                    { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                    {
                        text: '确定', onPress: () => {
                            Toast.message('清除历史搜索记录成功', null, 'center')
                            removeItem("searchHistory");
                            this.setState({
                                value: '',
                                searchHistory: [],
                            })
                        }
                    },
                ]
            )
        }
    }

    //获取历史记录
    _getHistory() {
        // 查询本地历史
        getItems("searchHistory").then(data => {
            if (data == null) {
                this.setState({
                    searchHistory: [],
                })
            } else {
                this.setState({
                    searchHistory: data,
                })
            }
        })
    }

    // 保存搜索标签
    _insertSearch(newText) {
        let text = newText.replace(/(^\s*)|(\s*$)/g, "")
        if (!_.isEmpty(text)) {
            if (this.state.searchHistory.indexOf(text) != -1) {
                // 本地历史 已有 搜索内容
                let index = this.state.searchHistory.indexOf(text);
                let tempArr = arrDelete(this.state.searchHistory, index)
                tempArr.unshift(text);
                setItem("searchHistory", tempArr);
            } else {
                // 本地历史 无 搜索内容
                let tempArr = this.state.searchHistory;
                tempArr.unshift(text);
                setItem("searchHistory", tempArr);
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/*监听页面，刷新搜索本地历史历史*/}
                <NavigationEvents onWillFocus={() => {
                    //查询本地搜索历史
                    this._getHistory();
                }} />
                <Header title='搜索'
                    navigation={this.props.navigation}
                    show_close_img={true}
                />
                <View style={styles.inputBox}>
                    <View style={styles.inputIcon}>
                        <Image source={require('../../../assets/images/i_goback.png')} />
                    </View>
                    <TextInput style={styles.inputText}
                        autoCapitalize="none"
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ value: text })}
                        onSubmitEditing={() => {
                            //开始搜索
                            this.onChanegeTextKeyword(this.state.value);
                            // 保存搜索内容
                            this._insertSearch(this.state.value);
                        }}
                        returnKeyType="search"
                        underlineColorAndroid="transparent"
                        placeholder={this.state.placeholder}
                        placeholderTextColor={'#BFBFBF'}
                        onFocus={this._onFous.bind(this)}
                        autoFocus={true}
                        defaultValue={this.state.value}
                        keyboardType="default" />
                </View>
                <View style={styles.lin} />
                {
                    (this.state.isPostList) ?
                        //列表
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.listView}>
                                <PostSearchList keyword={this.state.keyword}{...this.props} />
                            </View>
                        </ScrollView>
                        :
                        //历史和热门
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.head1}>
                                <Text style={{ color: "#333" }}>{"历史搜索"}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => this._deleteHistory()}>
                                    <Image source={require('../../../assets/images/i_goback.png')} />
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.searchHistory.length > 0 ?
                                    <View style={styles.queryList}>
                                        {this.state.searchHistory.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity onPress={() => {
                                                        //去搜索
                                                        this.onChanegeTextKeyword(item);
                                                        //给输入框赋值
                                                        this._setValues(item);
                                                        // 保存搜索内容
                                                        this._insertSearch(item);
                                                    }} activeOpacity={0.3}>
                                                        <Text numberOfLines={1} style={styles.queryItem}>{item}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    :
                                    <View style={styles.noData}>
                                        <Text style={styles.noDataTxt}>暂无搜索历史</Text>
                                    </View>
                            }
                            <View style={styles.head}>
                                <Text style={{ color: "#333" }}>{"热门搜索"}</Text>
                            </View>
                            {
                                this.state.hotTagsArr.length > 0 ?
                                    <View style={styles.queryList}>
                                        {/* 热门搜索标签渲染 */}
                                        {this.state.hotTagsArr.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity onPress={() => {
                                                        //去搜索
                                                        this.onChanegeTextKeyword(item);
                                                        //给输入框赋值
                                                        this._setValues(item);
                                                        // 保存搜索内容
                                                        this._insertSearch(item);
                                                    }} activeOpacity={0.3}>
                                                        <Text numberOfLines={1} style={styles.queryItem}>{item}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    :
                                    <View style={styles.noData}>
                                        <Text style={styles.noDataTxt}>更多热词敬请期待</Text>
                                    </View>
                            }

                        </ScrollView>
                }
            </View>
        )
    }



    // // 设置默认输入参数
    // static defaultProps = {

    // };

    // hotList = [
    //     {keyword: '景甜妈妈 张继科'},
    //     {keyword: '星巴克关闭店面'},
    //     {keyword: '魅族内讧'},
    //     {keyword: '老布什夫人去世'},
    //     {keyword: '5G争夺白热化'},
    //     {keyword: '美国客机迫降'},
    //     {keyword: '绿军2-0雄鹿'},
    //     {keyword: '记者暗访遭扣押'},
    //     {keyword: '电子身份证来了'},
    //     {keyword: '少年被批评后溺亡'}
    // ];



    // // 渲染完成钩子
    // componentDidMount() {
    //     this.search.focus();
    // }

    // _onChangeText = (text)=> {

    // };

    // _onClearText = ()=> {

    // };

    // _setColor = (index) => {

    //     switch (index){
    //         case 0:
    //             return '#CC0000';
    //         case 1:
    //             return '#FF6600';
    //         case 2:
    //             return '#ffCC66';
    //         default:
    //             return '#bfbfbf'
    //     }

    // };

    // render() {
    //     return (
    //         <View style={styles.container}>

    //             {/* 头部搜索区域 */}
    //             <View style={styles.headerContainer}>
    //                 <View style={styles.searchContainer}>
    //                     <Image style={styles.searchImg} source={require('./../../../assets/images/i_search_grey.png')} resizeMode={'contain'} />
    //                     <TextInput
    //                         ref={ref => this.search = ref}
    //                         style={styles.inputStyle}
    //                         placeholder={this.state.placeholder}
    //                         placeholderTextColor="#bfbfbf"
    //                         underlineColorAndroid="transparent"
    //                         onChangeText={this._onChangeText}
    //                         onClearText={this._onClearText}
    //                     />
    //                 </View>

    //                 <TouchableOpacity style={{width: 55, alignItems: 'center'}} activeOpacity={1} onPress={()=>{this.props.navigation.goBack()}}>
    //                     <Text style={styles.cancelBtn}>取消</Text>
    //                 </TouchableOpacity>
    //             </View>

    //             {/* 搜索推荐列表 */}
    //             <View>

    //                 <ScrollView>
    //                     {/* hot search */}
    //                     <Text style={styles.hotSearch}>热门搜索</Text>

    //                     {
    //                         this.hotList.map((item, index) => {

    //                             return (
    //                                 <View key={index} style={styles.hotListItem}>
    //                                     <Text style={{color: this._setColor(index), marginRight: 5}}>
    //                                         {index+1}.
    //                                     </Text>
    //                                     <Text style={styles.itemText}>
    //                                         {item.keyword}
    //                                     </Text>
    //                                     {
    //                                         !index && <Image style={styles.hotImg} source={require('./../../../assets/images/i_hot.png')} resizeMode={'contain'} />
    //                                     }
    //                                 </View>
    //                             )

    //                         })
    //                     }

    //                 </ScrollView>

    //             </View>

    //         </View>
    //     );
    // }

}

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         paddingLeft: 10,
//         backgroundColor: '#f8f8f8'
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         height: 70,
//         // paddingTop: isLT19()?0:25
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#cdcdcd',
//         borderRadius: 15,
//         paddingHorizontal: 10,
//     },
//     searchImg: {
//         width: 15,
//         height: 15,
//         marginRight: 5
//     },
//     inputStyle: {
//         width: screenWidth * .7,
//         padding: 0,
//         color: '#000',
//     },
//     cancelBtn: {
//         color: '#000'
//     },
//     hotSearch: {
//         height: 25,
//         marginTop: 30,
//         paddingBottom: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: '#bfbfbf',
//         color: '#bfbfbf',
//     },
//     hotListItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 6,
//         borderBottomWidth: 1,
//         borderBottomColor: '#bcbcbc'
//     },
//     itemText: {
//       color: '#000',
//         marginRight: 5
//     },
//     hotImg: {
//         width: 15,
//         height: 15,
//     }

// });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputBox: {
        height: Platform.OS === 'ios' ? 25 : 35,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
        borderWidth: 0,
        marginTop: 10,
    },
    lin: {
        height: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#f1f1f1',
        marginTop: 10,
    },
    scrollView: {},
    listView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
    },
    head1: {
        paddingHorizontal: 16,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    head: {
        paddingHorizontal: 16,
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    queryList: {
        marginTop: 10,
        marginRight: 16,
        marginLeft: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    queryItem: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 3,
        marginRight: 10,
        marginBottom: 10
    },
    inputIcon: {
        margin: Platform.OS === 'ios'
            ? 5
            : 10
    },
    inputText: {
        flex: 1,
        paddingLeft: 5,
        textAlignVertical: 'center',
        paddingVertical: 0
    },
    noData: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 12,
    },
    noDataTxt: {
    },
});
