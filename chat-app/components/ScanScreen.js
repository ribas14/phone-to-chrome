import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";
import { login } from "../store";

class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      read: ''
    }
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.saveStorageRoomIdUserId = this.saveStorageRoomIdUserId.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;              
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  async saveStorageRoomIdUserId(name, data) {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
      return
    } catch (error) {   
      console.log(error);
      return
    }
  }

  async handleBarCodeScanned ({ type, data }) {
    await delay(500);
    if (this.state.read == data) return;
    this.setState({ read: data });

    let roomStringQr = data;
    let stringQr = Math.random()
      .toString(36)
      .substring(2, 19);
      
    await this.saveStorageRoomIdUserId('roomStringQr', roomStringQr)
    await this.saveStorageRoomIdUserId('stringQr', stringQr)
    login({ stringQr, roomStringQr }, this.props.navigation);
  };
}

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

const mapState = (state, { navigation }) => ({
  user: state.user,
  room: state.room
});

export default connect(mapState)(ScanScreen);
