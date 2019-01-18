import React from "react";
import { StyleSheet, View, AsyncStorage, Text, Button } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import socket from "../store/socket";

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
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },

});

const mapState = (state, { navigation }) => ({
  room: state.room
});

export default connect(mapState)(Login);
