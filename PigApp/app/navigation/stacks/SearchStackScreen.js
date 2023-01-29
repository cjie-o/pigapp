import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsSearch from '../../screens/subPages/NewsSearch';
import CardOption from '../options/CardOption';

const SearchStack = createNativeStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <SearchStack.Screen name="Home" component={NewsSearch} />
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;