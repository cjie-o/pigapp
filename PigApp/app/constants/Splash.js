import React from 'react';
import {StyleSheet, Image, View, StatusBar} from 'react-native';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      // replace：销毁当前页，跳转到下个页面
      navigation.replace('Tab');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.splash}>
      {/* <StatusBar hidden={true} /> */}
      <Image source={require('../../assets/1.webp')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C0E1B',
  },
});
