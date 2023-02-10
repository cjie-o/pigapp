import React, { PureComponent } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'clwy-react-native-scrollable-tab-view';
import XFFlatList from '../components/HomeFlatList'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default class Home extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    tabArr = [
        { columnName: '新闻视频', requestCode: 'xinwensp' ,requestHome:'news'},
        { columnName: '猪价播报', requestCode: 'zhujiabobao' ,requestHome:'news'},
        { columnName: '技术视频', requestCode: 'jishusp' ,requestHome:'news'},
        { columnName: '企业视频', requestCode: 'qiyesp' ,requestHome:'news'},
        { columnName: '人物访谈', requestCode: 'fangtan' ,requestHome:'news'},
        { columnName: '直播养猪', requestCode: 'zhibo' ,requestHome:'news'},
    ];

    componentDidMount() {

    }


    render() {
        return (
            <View style={styles.container}>

                {/* 栏目条 */}
                <View style={styles.container}>

                    <ScrollableTabView
                        ref={'tabView'}
                        renderTabBar={() => <ScrollableTabBar style={{ borderBottomWidth: 0, paddingBottom: 5, width: screenWidth }} />}
                        tabBarUnderlineStyle={{ height: 2, minWidth: Math.floor(screenWidth * .9 / 5), backgroundColor: 'rgba(216,30,6,.8)' }}
                        tabBarInactiveTextColor="#515151"
                        tabBarActiveTextColor="#d81e06"
                        tabBarTextStyle={{ fontSize: 15 }}
                        onChangeTab={(ref) => { }}
                        onScroll={(postion) => { }}
                        locked={false}
                        initialPage={0}
                    >

                        {
                            this.tabArr.map(item => {
                                return (
                                    <XFFlatList
                                        key={item.columnName}
                                        tabLabel={item.columnName}
                                        requestCode={item.requestCode}
                                        requestHome={item.requestHome}
                                        navigation={this.props.navigation}
                                    />
                                )
                            })
                        }

                    </ScrollableTabView>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    tabViewItemContainer: {
        flex: 1,
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        alignItems: 'center'
    }

});