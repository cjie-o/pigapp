import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Easing,
    NativeModules,
    Linking
} from 'react-native';


export default class Data extends PureComponent{
    render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24 }}>数据中心</Text>
        </View>
      );
    }
}