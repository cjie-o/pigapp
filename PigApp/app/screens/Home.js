import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'clwy-react-native-scrollable-tab-view';
import XFFlatList from '../components/HomeFlatList'
// import Swiper from '@nart/react-native-swiper';
// import { isLT19 } from '../utils/ScreenUtil'

import ajax from '../utils/ajax'


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class Home extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  tabArr = [
    { columnName: '推荐', requestCode: 'tuijian' ,requestHome:'news'},
    { columnName: '社会热点', requestCode: 'shehuiredian' ,requestHome:'news'},
    { columnName: '国内新闻', requestCode: 'xinwen' ,requestHome:'news'},
    { columnName: '生猪货期', requestCode: 'qihuo' ,requestHome:'news'},
    { columnName: '国际新闻', requestCode: 'guojixinwen' ,requestHome:'news'},
    { columnName: '行业点评', requestCode: 'xingyedianping' ,requestHome:'news'},
    { columnName: '原创分析', requestCode: 'dujiafenxi' ,requestHome:'news'},
    { columnName: '行情分析', requestCode: 'hangqingfenxi' ,requestHome:'news'},
    { columnName: '每日猪评', requestCode: 'zhuping' ,requestHome:'news'},
    { columnName: '猪场建设', requestCode: 'zhuchangjs' ,requestHome:'news'},
    { columnName: '繁育管理', requestCode: 'shoujing' ,requestHome:'news'},
    { columnName: '饲养管理', requestCode: 'siliaoyy' ,requestHome:'news'},
    { columnName: '猪场管理', requestCode: 'kxyangzhu' ,requestHome:'news'},
    { columnName: '猪病技术', requestCode: 'zhubingfz' ,requestHome:'news'},
    { columnName: '生猪价格', requestCode: 'shengzhu' ,requestHome:'news'},
    { columnName: '仔猪价格', requestCode: 'zizhu' ,requestHome:'news'},
    { columnName: '猪肉价格', requestCode: 'zhurou' ,requestHome:'news'},
    { columnName: '各省市猪价', requestCode: 'shengshi' ,requestHome:'news'},
  ];

  // swiperData = [
  //     '华为不看好5G',
  //     '陶渊明后人做主播',
  //     '尔康制药遭处罚',
  //     '卢恩光行贿一案受审',
  //     '盖茨力挺扎克伯格',
  //     '大连特大刑事案件',
  //     '高校迷香盗窃案',
  //     '少年被批评后溺亡',
  //     '北京工商约谈抖音'
  // ];


  // componentDidMount() {

  //     //测试storage保存，然后再新闻详情组件读取
  //     storage.save({
  //         key: 'userInfo',  // 注意:请不要在key中使用_下划线符号!
  //         data: {
  //             userName: '小明',
  //             userId: '98765465465454',
  //             token: 'dsasadsa4566464'
  //         },
  //         // 如果不指定过期时间，则会使用defaultExpires参数
  //         // 如果设为null，则永不过期
  //         expires: 1000 * 3600
  //     });

  // }


  render() {
    return (
      <View style={styles.container}>

        {/* 栏目条 */}
        <View style={styles.container}>

          <View style={styles.columnSelect}>
            <Image source={require('../../assets/images/i_menu.png')} style={{ width: 20, height: 20 }} />
          </View>

          <ScrollableTabView
            ref={'tabView'}
            renderTabBar={() => <ScrollableTabBar style={{ borderBottomWidth: 0, paddingBottom: 5, width: screenWidth * .9, height: 45 }} />}
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
    position: 'relative'
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#d81e06',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    // paddingTop: isLT19()?0:25,
    paddingBottom: 5
  },
  headerLogo: {
    width: 45,
    height: 45,
  },
  headerSearchContainer: {
    width: screenWidth * 0.7,
    height: 33,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,.3)'
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerSearchImg: {
    width: 17,
    height: 17,
    marginRight: 5
  },
  headerSearchText: {
    color: '#F8F8F8'
  },
  headerRightImg: {
    width: 27,
    height: 27,
  },
  tabViewItemContainer: {
    flex: 1,
    backgroundColor: '#FFCCCC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth * .1,
    height: 50,
    top: 0,
    right: 0,
    /*shadowColor:'red',
    shadowOffset:{h:-10,w:-10},
    shadowRadius:3,
    shadowOpacity:1,*/
  }


});