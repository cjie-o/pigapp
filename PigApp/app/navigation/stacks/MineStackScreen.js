import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mine from '../../screens/Mine';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';

import Ionicons from 'react-native-vector-icons/Ionicons';
const MineStack = createNativeStackNavigator();

function Moon() {
  return (
    <Ionicons name="moon-outline" size={20} onPress={() => navigation.navigate('SearchStack')} />
  );
}

const MineStackScreen = () => {
  return (
    <MineStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <MineStack.Screen
        name="Mine"
        component={Mine}
        options={({ navigation, route }) => ({
          ...HeaderButtonsOption(navigation),
          headerTitle: props => <Moon {...props} />,
        })}
      />
    </MineStack.Navigator>
  );
};

export default MineStackScreen;