
// // // import * as React from 'react'

// // // import { Dimensions, StatusBar, View, View } from 'react-native'
// // // import Video from 'react-native-video'


// // // const { width, height } = Dimensions.get('screen')


// // // const VideoDetail = () => {
// // //     return (
// // //         <>
// // //             {/* <View style={{ flex: 1, background: "transparent" }}> */}
// // //                 <View
// // //                     style={{ height: height }}
// // //                     // orientation='vertical'
// // //                     // onPageSelected={e => setSelected(e.nativeEvent.position)}
// // //                     // initialPage={0}
// // //                     >
// // //                     {api.map((item, index) => {
// // //                         return (
// // //                             <View key={index}>
// // //                                 <Video
// // //                                     // rate={1.0}
// // //                                     // volume={1.0}
// // //                                     // isMuted={false}
// // //                                     // shouldPlay
// // //                                     // useNativeControls={false}
// // //                                     posterSource={item.poster}
// // //                                     source={item.video}
// // //                                     resizeMode='cover'
// // //                                 />
// // //                             </View>
// // //                         )
// // //                     })}
// // //                 </View>
// // //             {/* </View> */}
// // //         </>
// // //     )
// // // }

// // // export default VideoDetail

// // // import * as React from 'react';
// // // import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// // // import Video from 'react-native-video';


// // // const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

// // // export class VideoDetail extends React.PureComponent {
// // // api = [
// // //     {
// // //         id: 0,
// // //         video: "http://192.168.2.6:19787/api/video/url/58f42e7b5d8e0516.mp4",
// // //         poster: "https://cdn.yangzhu360.com/2023/0201/03551ac350d6024532ed78486932c96ad482b62d.jpg",

// // //     },
// // //     {
// // //         id: 1,
// // //         video: "http://192.168.2.6:19787/api/video/url/8a976035b2f80aa4.mp4",
// // //         poster: "https://cdn.yangzhu360.com/2023/0201/abcc14726c7a6e618f9b05a72fe8dd58fd0f3a20.png",

// // //     }
// // // ]
// // // const [currentItem, setCurrentItem] = useState(0);
// // //   const [data, setData] = useState<([]);

// // // render() {

// // //     return (
// // // <View style={{ height: screenHeight, flex: 1, }}>

// // //     {this.api.map(item => {
// // //         return (
// // //             <TouchableOpacity
// // //                 style={{width:"100%",height:"100%"}}
// // //                 // 额，，这个是我用来动态获取父级元素尺寸来设置视频组件尺寸用的。。。
// // //                 onLayout={this.layoutHandle}
// // //                 onPress={this.changeShowCtrl}
// // //             >
// // //                 <Video
// // //                     key={item.video}
// // //                     ref={video => this.video = video}
// // //                     style={{ width:"100%",height:"100%" }}
// // //                     controls={true}
// // //                     // ignoreSilentSwitch={'ignore'}
// // //                     rate={1.0}
// // //                     volume={1.0}
// // //                     repeat={true}
// // //                     onLoad={this.loadHandle}
// // //                     onProgress={this.progressHandle}
// // //                     // posterResizeMode="cover"
// // //                     // isMuted={false}
// // //                     // shouldPlay
// // //                     // useNativeControls={false}
// // //                     poster={item.poster}
// // //                     source={{ uri: item.video }}

// // //                     // fullscreenOrientation={'landscape'}
// // //                     resizeMode='cover'
// // //                 />
// // //             </TouchableOpacity>
// // //         )
// // //     })}
// // // </View>






// // import React, { useState, useCallback, useEffect, PureComponent } from 'react';
// // import { FlatList, Dimensions, View, StatusBar } from 'react-native';
// // import VideoPlayer from '../../components/VideoPlayer';

// // const screenHeight = Dimensions.get('screen').height;


// // const [currentItem, setCurrentItem] = useState(0);
// // const [data, setData] = useState < ([]);
// // const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
// //     // 这个方法为了让state对应当前呈现在页面上的item的播放器的state
// //     // 也就是只会有一个播放器播放，而不会每个item都播放
// //     // 可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
// //     // 只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
// //     if (viewableItems.length === 1) {
// //         setCurrentItem(viewableItems[0].index);
// //     }
// // }, []);
// // useEffect(() => {
// //     const mockData = [];
// //     for (let i = 0; i < 100; i++) {
// //         mockData.push({ id: i, pause: false });
// //     }
// //     setData(mockData);
// // }, []);
// // export default class VideoDeatail extends PureComponent {
// //     // 构造器
// //     constructor(props) {
// //         super(props);

// //         this.state = {
// //             newsData: [],
// //             Content: '',
// //             pause: boolean,
// //         };
// //     }

// //     // 设置默认输入参数
// //     static defaultProps = {

// //     };
// //     // 渲染完成钩子
// //     // componentDidMount() {
// //     //     this._getNewsDetailData();
// //     // }


// //     _getNewsDetailData() {

// //         let _this = this;
// //         let Sid = this.props.route.params.item.Sid;


// //         ajax({
// //             url: `http://192.168.2.6:19787/api/news/sid/${Sid}`,
// //             success: (data) => {
// //                 let [datas] = data;
// //                 // data[Sid]['img'].forEach(item =>{
// //                 //     Content = Content;
// //                 // });
// //                 _this.setState({
// //                     newsData: datas,
// //                     Content: datas["Video"]
// //                 });

// //             },
// //             error: (err) => {
// //                 console.info('详情请求错误:');
// //                 console.info(err);
// //             }
// //         });

// //     }

// //     render() {


// //         return (
// //             <View style={{ flex: 1 }}>
// //                 <StatusBar
// //                     backgroundColor="transparent"
// //                     translucent
// //                 />
// //                 <FlatList
// //                     data={data}
// //                     renderItem={({ item, index }) => (
// //                         <VideoPlayer
// //                             paused={index !== currentItem}
// //                             id={item.id}
// //                             video={this.state.Content}
// //                         />
// //                     )}
// //                     pagingEnabled={true}
// //                     getItemLayout={(item, index) => {
// //                         return { length: screenHeight, offset: screenHeight * index, index };
// //                     }}
// //                     onViewableItemsChanged={_onViewableItemsChanged}
// //                     keyExtractor={(item, index) => index.toString()}
// //                     viewabilityConfig={{
// //                         viewAreaCoveragePercentThreshold: 80, // item滑动80%部分才会到下一个
// //                     }}
// //                 />
// //             </View>
// //         );
// //     }
// // };

import React, { PureComponent } from 'react';
import {
    FlatList,
    Image,
    Text,
    View,
    Easing,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Animation,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Platform, NativeModules
} from 'react-native';
// import Header from '../components/Header'
import Video from "react-native-video";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ajax from '../../utils/ajax';
// import anim from '../../assets/lottie/play.json';
// import Animation from 'lottie-react-native';
// import { Actions } from 'react-native-router-flux';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export default class VideoDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            likecount: 200,
            commentcount: 9,
            newsData: [],
            Video1: '',
            Video2: '',
            refreshing: false,
            sourceData: [],
            flatHeight: 0,
            isPause: false, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
            current: 0,//表示当前item的索引，通过这个实现一个state控制全部的播放器
            data: []
        };
        this.handleClick = this.handleClick.bind(this);

        // this._renderItem = this._renderItem.bind(this)
        this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
    }
    // 设置默认输入参数
    static defaultProps = {

    };
    UNSAFE_componentWillMount() {

    }

    handleClick() {
        this.setState({
            liked: !this.state.liked,
            likecount: this.state.likecount + 1
        });
    }


    componentDidMount() {
        this._getNewsDetailData();
    }


    _getNewsDetailData() {

        let _this = this;
        let Sid = this.props.route.params.item.Sid;


        ajax({
            url: `http://192.168.2.6:19787/api/news/sid/${Sid}`,
            success: (data) => {
                let [datas] = data;
                _this.setState({
                    sourceData: data,
                    Video1: datas["Video"]
                });
            },
            error: (err) => {
                console.info('详情请求错误:');
                console.info(err);
            }
        });



    }
    _getNewsList() {
        let _this = this;
        ajax({
            url: `http://192.168.2.6:19787/api/news/jishusp`,
            success: (data) => {
                let [datas] = data;
                _this.setState({
                    sourceData: _this.state.refreshing ? data : [..._this.state.sourceData, ...data],
                    Video2: datas["Video"]
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
    }

    _renderFooter = () => {
        let len = this.state.sourceData.length;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: len < 1 ? 0 : 40, backgroundColor: "black" }}>
                <Image source={require('./../../../assets/images/i_loading.gif')} resizeMode={'contain'} style={{ width: 20, height: 20, marginRight: 5, color: "white" }} />
                <Text style={{ color: "white" }}>正在加载...</Text>
            </View>
        )
    };
    // 上拉加载更多
    _onEndReached = () => {
        this._getNewsList();
    };


    _renderItem = ({ item, index }) => {
        return (
            <FlatListItem
                item={item}
                iii={this.state.current}
                index={index}
                onPressItem={this._onPressItem}
                paused={index !== this.state.current}
                isPause={this.state.isPause}
            />
        );

    };
    _onViewableItemsChanged({ viewableItems, changed }) {
        //这个方法为了让state对应当前呈现在页面上的item的播放器的state
        //也就是只会有一个播放器播放，而不会每个item都播放
        //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
        //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if (viewableItems.length === 1) {
            this.setState({
                current: viewableItems[0].index,
            })
        }
    };

    render() {
        const VIEWABILITY_CONFIG = {
            viewAreaCoveragePercentThreshold: 40,//item滑动80%部分才会到下一个
            minimumViewTime: 300,
            waitForInteraction: true
        };
        return (
            <View >
                <StatusBar
                    backgroundColor="transparent"
                    translucent
                />
                <FlatList
                    // ref={ref => this.flatList = ref}
                    data={this.state.sourceData}
                    renderItem={this._renderItem}
                    onEndReached={this._onEndReached}
                    pagingEnabled={true} // 一次滑动一屏
                    getItemLayout={(data, index) => {
                        return { length: screenHeight, offset: screenHeight * index, index }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                    ListFooterComponent={this._renderFooter}
                    extraData={this.state.selected}
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                    // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                />

            </View>

        );
    }
}


class FlatListItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isPause: false, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
        }
    }
    render() {
        let item = this.props.item;
        let index = this.props.index;
        let iii = this.props.iii;

        console.info(this.props.isPause)
        const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.HEIGHT;
        const like = item.liked ? 'red' : 'white';
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback style={{ flex: 1 }}
                    onPress={() => {
                        this.setState({
                            isPause: !this.state.isPause,
                        })
                    }}
                >
                    <Video
                        source={{ uri: item.Video }}
                        resizeMode={'contain'}
                        poster={item.Videoimage}
                        // controls={true}
                        paused={index === iii ? this.state.isPause : true}
                        // paused={true}
                        style={styles.backgroundVideo}


                    />
                </TouchableWithoutFeedback>
                <View column style={{ position: 'absolute', width: screenWidth, height: screenHeight, justifyContent: 'flex-end', }}>


                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagtitle}>{item.Source}</Text>
                    </TouchableOpacity>
                    <Text style={styles.username}>{item.Introduction}</Text>
                    {/* <View style={{ marginTop: 10 }}> */}
                    <TouchableOpacity row style={{ backgroundColor: '#4d4d4d', borderRadius: 17, padding: 10, alignItems: 'center', width: 270 }}>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10 }}>写评论...</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                {/*底部 右侧*/}
                <View column style={{ position: 'absolute', width: screenWidth, height: screenHeight, alignItems: 'flex-end', padding: 20, marginTop: screenHeight / 2 }}>
                    <TouchableOpacity column center onPress={this.handleClick}>
                        <Ionicons name="heart" size={40} color={like} />
                    </TouchableOpacity>
                    <Text style={styles.likecount}>{item.likecount}</Text>
                    <TouchableOpacity onPress={() => Actions.Comments()} >
                        <Ionicons name="chatbox" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.commentcount}>{item.commentcount}</Text>
                    <TouchableOpacity>
                        <Ionicons name="arrow-redo-sharp" size={40} color="white" />
                    </TouchableOpacity>
                </View>


                {
                    this.state.isPause ?
                        <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }} >

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isPause: !this.state.isPause,
                                })
                            }}>
                               <Ionicons name="caret-forward-circle-outline" size={70} color="white" />
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </View>
        );
    }

}


const styles = StyleSheet.create({

    video: {
        height: screenHeight,
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    item: {
        height: screenHeight, // 高度等于屏幕的高度
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        height: screenHeight, // 高度等于屏幕的高度
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        height: screenHeight,
        width: screenWidth
    },
    full: {
        flex: 1,
        flexDirection: 'row'
    },
    rightside: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: 8
    },
    leftside: {
        alignItems: 'flex-start'
    },
    rightcontent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    likecount: {
        color: 'white',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    commentcount: {
        color: 'white',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    share: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagtitle: {

        padding: 10,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'

    },
    tag: {
        backgroundColor: '#f20b3a',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: screenWidth / 2
    },
    username: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
        width: screenWidth - 100
    },
    commentsBottom: {
        color: 'white',
        marginLeft: 8
    },
    userimage: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    },
    backgroundVideo: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'black',
    },


});

