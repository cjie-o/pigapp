import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetail from '../../screens/subPages/NewsDetail';
import CardOption from '../options/CardOption';
// import HeaderButtonsOption from '../options/HeaderButtonsOption';

const NewsDetailStack = createNativeStackNavigator();

export default class NewsDetailStackScreen extends PureComponent{
  constructor(props){
    super(props);
  }
  render(){ 
    return (
    <NewsDetailStack.Navigator
    screenOptions={({ route, navigation }) => ({
          ...CardOption(route, navigation),
        })}>
       
       <NewsDetailStack.Screen name="NewsDetail" component={NewsDetail}  initialParams={this.props.route.params} />
      </NewsDetailStack.Navigator>
    );

  }
}