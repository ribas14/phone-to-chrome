import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { createStackNavigator, createAppContainer  } from "react-navigation";
import ScanScreen from './components/ScanScreen';
import Login from './components/Login';
import Users from './components/Users';
import Chat from './components/Chat';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const RootStack = createAppContainer(createStackNavigator({
  Login: {
    screen: Login
  },
  ScanScreen: {
    screen: ScanScreen
  },
  Users: {
    screen: Users
  },
  Chat: {
    screen: Chat
  }
 }, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerTitle: 'Chat!'
  }
}));