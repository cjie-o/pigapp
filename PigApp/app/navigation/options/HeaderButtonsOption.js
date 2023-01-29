import * as React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';
import { TouchableOpacity, Text, View, Dimensions, StyleSheet, StatusBar } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HeaderButtonsOption = navigation => {

  return {
    headerTitleAlign: 'left',

    // 标题背景
    headerStyle: {
      backgroundColor: Colors.headerbg,
    },

    headerLeft: () => null,

    headerRight: () => (
      <>

        <StatusBar backgroundColor={Colors.headerbg} translucent={true} />
        <View style={styles.headerSearchContainer}>
          {/* <TouchableOpacity activeOpacity={1}  onPress={() => { navigation.navigate('SearchStack', { keyword: item }) }}> */}
          <TouchableOpacity activeOpacity={1} style={styles.swiperItem} onPress={() => { this.props.navigation.push('NewsSearch') }}>
            <SimpleLineIcons
              name="magnifier"
              style={styles.headerSearch}
              size={20}
              onPress={() => navigation.navigate('SearchStack')}
            />
            <Text >111111</Text>
          </TouchableOpacity>
        </View>
        <SimpleLineIcons
          name="options"
          style={styles.headerSetting}
          size={20}
          onPress={() => navigation.navigate('SettingStack')}
        />
      </>
    ),
  };
};


const styles = StyleSheet.create({
  headerSearchContainer: {
    width: screenWidth * 0.7,
    height: 33,
    borderRadius: 18,
    backgroundColor: Colors.white
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  headerSearch: {
    marginRight: 5,
    color: Colors.headerButton
  },
  headerSetting: {
    color: Colors.headerButtonWhite,
    marginLeft: 15
  },
});

export default HeaderButtonsOption;