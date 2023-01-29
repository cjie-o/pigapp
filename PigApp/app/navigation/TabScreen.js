import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabOption from './options/TabOption';
import Colors from '../constants/Colors';
import HomeStackScreen from './stacks/HomeStackScreen';
import VideoStackScreen from './stacks/VideoStackScreen';
import DataStackScreen from './stacks/DataStackScreen';
import MineStackScreen from './stacks/MineStackScreen';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        ...TabOption(route),
        tabBarActiveTintColor: Colors.bottomButton,
        tabBarInactiveTintColor: Colors.tabBarInactiveText,
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="VideoStack" component={VideoStackScreen} />
      <Tab.Screen name="DataStack" component={DataStackScreen} />
      <Tab.Screen name="MineStack" component={MineStackScreen} />
    </Tab.Navigator>
  );
}

export default TabScreen;
