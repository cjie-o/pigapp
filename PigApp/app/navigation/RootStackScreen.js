import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchStackScreen from './stacks/SearchStackScreen';
// import SettingStackScreen from './stacks/SettingStackScreen';
import TabScreen from './TabScreen';
import VideoDetail from '../screens/subPages/VideoDetail';
import NewsDetail from '../screens/subPages/NewsDetail';
import NewsDetailStackScreen from './stacks/NewsDetailStackScreen';
import Splash from '../constants/Splash';
const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Group>
          <RootStack.Screen name="Tab" component={TabScreen} />
          <RootStack.Screen name="SearchStack" component={SearchStackScreen} />
          {/* <RootStack.Screen name="SettingStack" component={SettingStackScreen} /> */}
          <RootStack.Screen name="NewsDetailStack" component={NewsDetailStackScreen} />
          <RootStack.Screen name="VideoDetail" component={VideoDetail} />
          <RootStack.Screen name="Splash" component={Splash} />
        </RootStack.Group>

        <RootStack.Group>


          {/* 注意一下 */}
          {/* <RootStack.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={{
              presentation: 'fullScreenModal',
            }}
          /> */}
      
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackScreen;