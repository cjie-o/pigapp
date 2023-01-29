import React, { PureComponent } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Video from "react-native-video";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class VideoFlatList extends PureComponent {

    constructor(props){
        super(props)
        this.state={
            // data:tempCollect,//我模拟的数据 这个就自行找一些视频url就好
            isPause:true, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
            // current:0,//表示当前item的索引，通过这个实现一个state控制全部的播放器
        }
        // this.renderItem = this.renderItem.bin(this)
        // this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
    }

    /**  item布局 播放器 等*/
    render() {
        return (
            <View style={{ width: screenWidth, height: screenHeight }}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
                    this.setState({
                        // isPause: !this.state.isPause,
                    })
                }}>
                    <Video source={{ uri: "https://apd-70b51c01213935884bc8d81667552ae8.v.smtcdns.com/om.tc.qq.com/AjDQe_qnHFdHcxCVS6PpLZIfVd1odD8wFEmtGl6EnzJA/B_Ui4-QEkRPfhTNlYdo0HujoYzDD6uXu-rN8DKV1bqaD8/svp_50200/njc_1000195_0bc32ubksaacwaans3mqcnrrvvoevhkqfkka.f2.mp4?sdtfrom=v1104&guid=f31fd3aac554d408&vkey=4DC78EAF44E02FD283195DA83A1BE85F2B49034C843FC44F4B0D1C7531FA447090B3E92899C1C16767AC585A1BA1AAE52BB964BED7AE70DD609878B04883B6A17B27B62E20F1D4FFFECCF4CA5B6B6F547BF6777C6C2E820E064F792A304D1D73A2935166F420E37C04AFC214A9FFF972C96DB1550DB5F92994A4E1A9DF5C451D" }}
                        style={{ flex: 1, backgroundColor: '#000' }}
                        repeat={true}
                        paused={ true}
                        resizeMode='contain'
                    >
                    </Video>
                </TouchableWithoutFeedback>
                {/*信息（头像，标题等）、写评论*/}
                <View column style={{ position: 'absolute', width: screenWidth, height: screenHeight, justifyContent: 'flex-end', padding: 20, marginBottom: 30 }}>
                    <View row style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/i_search.png')} style={{ width: 50, height: 50, borderRadius: 50, }} />
                        <Text style={{ fontSize: 15, color: '#fff', marginLeft: 10 }}>懒散少女和猫</Text>
                        <TouchableOpacity center style={{ width: 60, height: 30, backgroundColor: '#f98589', borderRadius: 5, marginLeft: 10 }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>关注</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>美丽的傍晚</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, padding: 3, width: 155, marginTop: 10 }}>
                        <Image source={require('../../assets/images/i_search.png')} style={{ width: 15, height: 15 }} />
                        <Text style={{ fontSize: 13, color: '#fff', marginLeft: 10 }}>@懒散的少女和猫</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity row style={{ backgroundColor: '#4d4d4d', borderRadius: 17, padding: 10, alignItems: 'center', width: 270 }}>
                            <Image source={require('../../assets/images/i_search.png')} style={{ width: 15, height: 15 }} />
                            <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10 }}>写评论...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*底部 右侧 功能键 （我拍，点赞，评论，转发）*/}
                <View column style={{ position: 'absolute', width: screenWidth, height: screenHeight , justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 }}>
                    <TouchableOpacity column center style={styles.bottomRightBn} >
                        <Image source={require('../../assets/images/i_search.png')} resizeMode={'contain'} style={styles.bottomRightImage} />
                        <Text style={styles.bottomRightText}>我拍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity column center style={styles.bottomRightBn}>
                        <Image source={require('../../assets/images/i_search.png')} resizeMode={'contain'} style={styles.bottomRightImage} />
                        <Text style={styles.bottomRightText}>2.1万</Text>
                    </TouchableOpacity>
                    <TouchableOpacity column center style={styles.bottomRightBn}>
                        <Image source={require('../../assets/images/i_search.png')} resizeMode={'contain'} style={styles.bottomRightImage} />
                        <Text style={styles.bottomRightText}>300</Text>
                    </TouchableOpacity>
                    <TouchableOpacity column center style={[styles.bottomRightBn, { marginBottom: 50 }]}>
                        <Image source={require('../../assets/images/i_search.png')} resizeMode={'contain'} style={styles.bottomRightImage} />
                        <Text style={styles.bottomRightText}>分享</Text>
                    </TouchableOpacity>
                </View>
                {/* 屏幕中央 播放按钮 */}
                {
                    // this.state.isPause ?
                    //     <View column center flex style={{ position: 'absolute', width: screenWidth, height: screenHeight, }}>
                    //         <TouchableOpacity
                    //             onPress={() => {
                    //                 this.setState({
                    //                     isPause: !this.state.isPause,
                    //                 })
                    //             }}
                    //         >
                    //             <Image source={require('../../assets/images/i_search.png')} resizeMode={'contain'} style={{ width: 60, height: 60 }} />
                    //         </TouchableOpacity>
                    //     </View> : null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomRightBn: {
        width: 50,
        height: 50,
        marginTop: 20,
    },
    bottomRightImage: {
        width: 30,
        height: 30,
    },
    bottomRightText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    }
});
