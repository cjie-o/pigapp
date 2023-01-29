import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
// import VideoPlayer from '../../components/VideoPlayer';
// import Orientation from 'react-native-orientation-locker';

import ajax from '../../utils/ajax'
import Video from 'react-native-video';
import VideoFlatList from '../../components/VideoFlatList';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class VideoDetail extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            newsData: '',
            videourl: '',
            isShowImgModal: false,
            statusBarTranslucent: true,
        };
    }
    // 设置默认输入参数
    static defaultProps = {

    };
    // 渲染完成钩子
    componentDidMount() {
        this._getNewsDetailData();
    }


    _getNewsDetailData() {

        let _this = this;
        let docid = this.props.route.params.item.docid;

        ajax({
            url: `http://192.168.2.6:19787/api/v1/video/docid/${docid}`,
            success: (data) => {
                let videourl = data[docid].videourl;
                // data[docid]['img'].forEach(item =>{
                //     videourl = videourl;
                // });
                _this.setState({
                    newsData: data[docid],
                    videourl: videourl
                });
                console.info(videourl);
            },
            error: (err) => {
                console.info('详情请求错误:');
                console.info(err);
            }
        });

    }


    imgIndex = -1;
    imgArr = [];
    initIndex = 0;

    _renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name === 'img') {
            this.imgIndex++;
            let nodeAttr = node.attribs;
            let num = this.imgIndex;
            this.imgArr.push({ url: nodeAttr.src });
            return (
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => { this._showImgModal(num) }}>
                    <Image source={{ uri: nodeAttr.src }} resizeMode={'stretch'} style={{ flex: 1, height: this._getImgHeight(nodeAttr.src), marginBottom: 35 }} />
                </TouchableOpacity>
            );
        }
    };

    // 图片高度自适应
    _getImgHeight = (imageUri) => {
        let imgHeight = 230;
        Image.getSize(imageUri, (width, height) => {
            imgHeight = Math.floor(screenWidth / width * height);
        });
        return imgHeight
    };

    _showImgModal = (index) => {
        this.initIndex = index;
        this.setState({
            isShowImgModal: true,
            statusBarTranslucent: false
        });
    };

    _closeImgModal = () => {
        this.setState({
            isShowImgModal: false,
            statusBarTranslucent: true
        })
    };

    _onScroll = (event) => {

        console.log(event.nativeEvent.contentOffset.y)

    };
    render(){
		const VIEWABILITY_CONFIG = {
    		viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
		};
        return(
            <View>
                <VideoFlatList
                    data={"https://apd-70b51c01213935884bc8d81667552ae8.v.smtcdns.com/om.tc.qq.com/AjDQe_qnHFdHcxCVS6PpLZIfVd1odD8wFEmtGl6EnzJA/B_Ui4-QEkRPfhTNlYdo0HujoYzDD6uXu-rN8DKV1bqaD8/svp_50200/njc_1000195_0bc32ubksaacwaans3mqcnrrvvoevhkqfkka.f2.mp4?sdtfrom=v1104&guid=f31fd3aac554d408&vkey=4DC78EAF44E02FD283195DA83A1BE85F2B49034C843FC44F4B0D1C7531FA447090B3E92899C1C16767AC585A1BA1AAE52BB964BED7AE70DD609878B04883B6A17B27B62E20F1D4FFFECCF4CA5B6B6F547BF6777C6C2E820E064F792A304D1D73A2935166F420E37C04AFC214A9FFF972C96DB1550DB5F92994A4E1A9DF5C451D"}
                    renderItem={this.renderItem}
                    horizontal={false}
                    pagingEnabled={true}
                    getItemLayout={(data, index) => {
                        return {length: height, offset: height * index, index}
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                />
                {/*顶部 关闭、搜索 按钮*/}
                <View style={{position:'absolute',width:screenWidth,}}>
                    <View row style={{justifyContent: 'space-between',alignItems: 'center',width:screenWidth,padding:20}} >
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.goBack();
                        }}>
                            <Image source={require('../../../assets/images/i_search.png')} style={{width:30,height:30}} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={require('../../../assets/images/i_search.png')} style={{width:30,height:30}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
     _onViewableItemsChanged({viewableItems, changed}) {
		//这个方法为了让state对应当前呈现在页面上的item的播放器的state
		//也就是只会有一个播放器播放，而不会每个item都播放
		//可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
		//只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if(viewableItems.length === 1){
            this.setState({
                current:viewableItems[0].index,
            })
        }

    }

}
