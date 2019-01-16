import React from 'react'
import { createDrawerNavigator } from 'react-navigation';
import {  SafeAreaView } from 'react-navigation';
import {  Platform } from "react-native"
import { Icon } from 'native-base';

import CustomDrawerContentComponent from './CustomDrawerContentComponent'
import Chat from '../components/Chat'
import Settings from '../components/Settings'


// tamanho do statusbar grande demais
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}

const Drawer = createDrawerNavigator({
  Chat: {
    screen: Chat,
    navigationOptions: () =>  {
      return {
        drawerIcon: () => (
          <Icon 
            name="md-chatbubbles"
          />
        )
      }
    }
  },
  Settings: {
    screen: Settings,
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
  contentComponent: CustomDrawerContentComponent, 
  activeTintColor: '#890409',
  initialRouteName: 'Chat',
});
    


export default Drawer; 


