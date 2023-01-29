import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import CardOption from '../options/CardOption';
import HeaderButtonsOption from '../options/HeaderButtonsOption';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          ...HeaderButtonsOption(navigation),
          title: '新闻',
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;