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
    AsyncStorage.clear()     
  }

  async componentDidMount() {
    // this.cleanStorage()    
    var stringQr = await AsyncStorage.getItem("stringQr");
    var roomStringQr = await AsyncStorage.getItem("roomStringQr");

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

      this.props.navigation.navigate("ScanScreen");
    }
  }

  render() {
    return <View/>;
  }
}

const mapState = (state, { navigation }) => ({
  stringQr: state.stringQr,
  roomStringQr: state.roomStringQr
});

export default connect(mapState)(Login);
