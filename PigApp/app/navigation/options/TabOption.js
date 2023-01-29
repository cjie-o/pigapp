import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// TabOption 配置
const TabOption = route => {
  let labelName;
  let iconName;

  switch (route.name) {
    case 'HomeStack':
      labelName = '新闻';
      iconName = 'home';
      break;
    case 'VideoStack':
      labelName = '视频';
      iconName = 'caret-forward-outline';
      break;
    case 'DataStack':
      labelName = '数据中心';
      iconName = 'bar-chart';
      break;
    default:
      labelName = '我的';
      iconName = 'person';
  }
  return {
    tabBarLabel: labelName,
    tabBarIcon: ({ focused, color }) => (
      <Ionicons name={iconName} size={25} color={color} />
    ),
  };
};

export default TabOption;
