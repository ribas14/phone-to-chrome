import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { openChat, sendMessage } from "../store";
import { View, Platform, Keyboard, KeyboardAvoidingView  } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Icon } from "native-base";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: true
    },
    this.send = this.send.bind(this);
  }  

  componentWillUnmount() {
    this.setState({ mounted: false })
  }

  static navigationOptions = ({ navigation }) => {
    const goBackAndDismissKeyboard = navigation => {
      Keyboard.dismiss();
      navigation.toggleDrawer();
    };

    return {
      title: "",
      headerTitleStyle: {
        textAlign: "center",
        left: 0,
        flex: 1
      },
      headerRight:
        navigation.state.params && navigation.state.params.headerRight,
      headerLeft: (
        <View
          style={{ paddingLeft: 16, marginRight: 20 }}
          hitSlop={{ top: 120, bottom: 120, left: 150, right: 150 }}
        >
          <Icon
            style={{ color: "#fff" }}
            hitSlop={{ top: 120, bottom: 120, left: 150, right: 150 }}
            onPress={() => goBackAndDismissKeyboard(navigation)}
            name="md-menu"
          />
        </View>
      )
    };
  };

  componentDidMount() {
    openChat({ user: this.props.user, room: this.props.room });
  }

  send(message) {
    sendMessage(message.text, this.props.user, this.props.room);
  }

  render() {
    const { mounted } = this.state
    return (
      <View style={{ flex: 1 }}>
        {mounted && (
            <GiftedChat
              textInputProps={{ autoFocus: true }}
              messages={this.props.messages}
              user={{
                _id: this.props.user.id
              }}
              onSend={message => this.send(message[0])}
            />
        )}

        {/* {Platform.OS === "android" ? <KeyboardSpacer /> : null} */}
        {/* Fix this later, in my phone the input is behind the keyboard but not in normal phones */}
        {/* {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={ToolbarAndroid.currentHeight}/> : null } */}
      </View>
    );
  }
}

const mapState = (state, { navigation }) => ({
  messages: state.messages,
  user: state.user,
  room: state.room
});

export default connect(mapState)(Chat);
