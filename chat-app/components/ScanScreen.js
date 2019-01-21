import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";
import { login } from "../store";

const EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/chrome-to-phone/hobhnejpjknnhojomhmppgdalddofend";
  const SITE_URL = "https://CtoP.site"

const { width } = Dimensions.get("window");
const qrSize = width * 0.5;

class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      read: ""
    };
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
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No access to camera</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}
        >
          <Text style={styles.description}>Scan the QR code</Text>
          <Image style={styles.qr} source={require("../assets/QR.png")} />
          <TouchableOpacity>
            <Text
              onPress={() => Linking.openURL(SITE_URL)}
              style={[styles.cancel, {textDecorationLine: "underline"}]}
            >
              Go to CtoP.site
            </Text>
          </TouchableOpacity>
          <Text style={styles.cancel}>or</Text>
          <TouchableOpacity>
            <Text
              onPress={() => Linking.openURL(EXTENSION_URL)}
              style={[styles.cancel, {textDecorationLine: "underline"}]}
            >
              Download extension
            </Text>
          </TouchableOpacity>
        </BarCodeScanner>
      </View>
    );
  }

  async saveStorageRoomIdUserId(name, data) {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async handleBarCodeScanned({ type, data }) {
    await delay(500);
    if (this.state.read == data) return;
    this.setState({ read: data });

    let roomStringQr = data;
    let stringQr = Math.random()
      .toString(36)
      .substring(2, 19);

    await this.saveStorageRoomIdUserId("roomStringQr", roomStringQr);
    await this.saveStorageRoomIdUserId("stringQr", stringQr);

    login({ stringQr, roomStringQr }, this.props.navigation);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "10%",
    textAlign: "center",
    width: "70%",
    color: "white"
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white"
  }
});
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
