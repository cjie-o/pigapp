import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Data from '../../screens/Data';
import CardOption from '../options/CardOption';
import HeaderButtonsOption from '../options/HeaderButtonsOption';

const DataStack = createNativeStackNavigator();

const DataStackScreen = () => {
  return (
    <DataStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <DataStack.Screen
        name="Data"
        component={Data}
        options={({ navigation }) => ({
          ...HeaderButtonsOption(navigation),
          title: '新闻',
        })}
      />
    </DataStack.Navigator>
  );
};

export default DataStackScreen;