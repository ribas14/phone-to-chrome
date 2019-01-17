import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { createSwitchNavigator, createAppContainer  } from "react-navigation";
import ScanScreen from './components/ScanScreen';
import Login from './components/Login';
import Drawer from './nav/Drawer';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const RootStack = createAppContainer(createSwitchNavigator({
  Login: {
    screen: Login
  },
  ScanScreen: {
    screen: ScanScreen
  },
  Drawer: {
    screen: Drawer
  }
 }, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerTitle: 'Chat!'
  }
}));