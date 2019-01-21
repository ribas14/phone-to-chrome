import React from "react";
import { StyleSheet, View, AsyncStorage, Text, Button, Linking } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import socket from "../store/socket";

const EXTENSION_URL = "https://chrome.google.com/webstore/detail/chrome-to-phone/hobhnejpjknnhojomhmppgdalddofend"
const SITE_URL = "https://CtoP.site"

class Login extends React.Component {
  constructor() {
    super();
    this.newIdentity = this.newIdentity.bind(this);   
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Settings",
      headerTitleStyle: {
        textAlign: "center",
        left: -30,
        flex: 1
      },
      // headerRight:
      //   navigation.state.params && navigation.state.params.headerRight,
      headerLeft: (
        <View
          style={{ paddingLeft: 16, marginRight: 20 }}
          hitSlop={{ top: 120, bottom: 120, left: 150, right: 150 }}
        >
          <Icon
            style={{ color: "#fff" }}
            hitSlop={{ top: 120, bottom: 120, left: 150, right: 150 }}
            onPress={() => navigation.toggleDrawer()}
            name="md-menu"
          />
        </View>
      )
    };
  };

  newIdentity() {
    socket.emit("newId", this.props.room.roomStringQr);
    AsyncStorage.clear();
    this.props.navigation.navigate("ScanScreen")
  }

  async componentDidMount() {
    // this.cleanStorage()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.newIdentity()}
          title="New identity"
          color="#209cee"
        />
        <View style={{ padding: 10 }}></View>
        <Button
          onPress={() => Linking.openURL(EXTENSION_URL)}
          title="Chrome extension"
          color="#209cee"
        />
        <Button
          onPress={() => Linking.openURL(SITE_URL)}
          title="Go to site"
          color="#209cee"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    padding: 20
  },

});

const mapState = (state, { navigation }) => ({
  room: state.room
});

export default connect(mapState)(Login);
