import React from "react";
import {
  View,
  AsyncStorage
} from "react-native";
import { login } from "../store";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor() {
    super();
    this.cleanStorage = this.cleanStorage.bind(this)
  }

  cleanStorage() {
    try {
      AsyncStorage.clear()
    } catch (e) {
      console.warn(e)
    }
  }

  async componentDidMount() {
    // this.cleanStorage()
    try {
      var stringQr = await AsyncStorage.getItem("stringQr");
      var roomStringQr = await AsyncStorage.getItem("roomStringQr");
    } catch (e) {
      console.warn(e)
    }

    if (this.props.roomStringQr) {
      login(
        {
          stringQr: this.props.stringQr,
          roomStringQr: this.props.roomStringQr
        },
        this.props.navigation
      );
    } else if (roomStringQr) {
      roomStringQr = roomStringQr.replace(/['"]+/g, '')
      stringQr = stringQr.replace(/['"]+/g, '')

      login({ stringQr, roomStringQr }, this.props.navigation);
    } else {
      // roomStringQr = "6gvx70cp3h"
      // stringQr = "1df7h1f7cl8"

      // login({ stringQr, roomStringQr }, this.props.navigation);



      this.props.navigation.navigate("ScanScreen");
    }
  }

  render() {
    return <View />;
  }
}

const mapState = (state, { navigation }) => ({
  stringQr: state.stringQr,
  roomStringQr: state.roomStringQr
});

export default connect(mapState)(Login);
