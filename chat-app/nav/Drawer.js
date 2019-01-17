import React from 'react'
import { createDrawerNavigator } from 'react-navigation';
import {  SafeAreaView } from 'react-navigation';
import {  Platform } from "react-native"
import { Icon } from 'native-base';

import CustomDrawerContentComponent from './CustomDrawerContentComponent'
import ChatNav from './ChatNav'
import SettingsNav from './SettingsNav'


// tamanho do statusbar grande demais
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}

const Drawer = createDrawerNavigator({
  Chat: {
    screen: ChatNav,
    navigationOptions: () =>  {
      return {
        drawerIcon: () => (
          <Icon 
            name="chatbubbles"
          />
        )
      }
    }
  },
  Settings: {
    screen: SettingsNav,
    navigationOptions: () =>  {
      return {  
        drawerIcon: () => (
          <Icon 
            name="md-settings"
          />
        )
      }
    }
  }
}, {
  drawerBackgroundColor: 'rgba(255,255,255,0.8)',
  keyboardDismissMode: 'on-drag',
  contentComponent: CustomDrawerContentComponent, 
  activeTintColor: '#890409',
  initialRouteName: 'Settings',
});
    


export default Drawer; 


