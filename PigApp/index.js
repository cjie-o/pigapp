import { AppRegistry } from 'react-native';
import RootStackScreen from './app/navigation/RootStackScreen';
import { name as appName } from './app.json';

// 图标库
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

AppRegistry.registerComponent(appName, () => RootStackScreen);

SimpleLineIcons.loadFont();
Ionicons.loadFont();
EvilIcons.loadFont();
MaterialIcons.loadFont();