import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native'
import Settings from '../components/Settings';

const SettingsNav = createStackNavigator({
    Settings: {screen: Settings},
},
{
  initialRouteName: 'Settings',
  defaultNavigationOptions: {
    headerTitleStyle: { 
      textAlign:"center", 
      left: -30,
      flex:1,
      
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#118fe4',
    },
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  }),
})

export default SettingsNav;