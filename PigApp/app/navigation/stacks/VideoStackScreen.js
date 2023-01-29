import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Video from '../../screens/Video';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';

const VideoStack = createNativeStackNavigator();

const VideoStackScreen = () => {
  return (
    <VideoStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <VideoStack.Screen
        name="Video"
        component={Video}
        options={({ navigation, route }) => ({
          ...HeaderButtonsOption(navigation),
          title: '视频',
        })}
      />
    </VideoStack.Navigator>
  );
};

export default VideoStackScreen;
