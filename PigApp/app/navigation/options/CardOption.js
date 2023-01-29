import * as React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Share from 'react-native-share';


const shareOptions = {
  title: '分享的标题',
  message: '分享的消息',
  url: 'https://clwy.cn',
  subject: `来自「长乐未央」的分享`,
};


//  Card Stack 配置
const CardOption = (route, navigation) => ({
  // 标题的样式
  headerTitleStyle: {
    fontWeight: '400',
    color: Colors.headerTitle,
  },

  // 标题组件的颜色（自带返回箭头）
  headerTintColor: Colors.headerButton,


  // 安卓标题栏居中
  headerTitleAlign: 'center',

  //安卓使用左右切屏
  animation: 'slide_from_right',

  // 安卓滑动返回的方向为：水平
  gestureDirection: 'horizontal',

  // 默认标题为空
  title: '',

  // 自定义返回按钮
  headerLeft: () => (
    <Ionicons
      name={Platform.OS === 'ios' ? 'ios-chevron-back' : 'md-arrow-back'}
      size={Platform.OS === 'ios' ? 30 : 25}
      color={Colors.headerButton}
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        Share.open(shareOptions)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      }}>
      <Ionicons
        name={'ellipsis-horizontal'}
        size={Platform.OS === 'ios' ? 30 : 25}
        color={Colors.headerButton}
      />
    </TouchableOpacity>
  ),
});

export default CardOption;