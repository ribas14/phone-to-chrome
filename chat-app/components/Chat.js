import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { openChat, sendMessage, warnServerPhoneConnected } from "../store";
import { View, Platform } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    openChat({ user: this.props.user, room: this.props.room });
    warnServerPhoneConnected({room: this.props.room})
  }

  send(message) {
    sendMessage(message.text, this.props.user, this.props.room);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.props.messages}
          user={{
            _id: this.props.user.id
          }}
          onSend={message => this.send(message[0])}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={50} /> : null}
      </View>
    );
  }
}

const mapState = (state, { navigation }) => ({
  messages: state.messages,
  user: state.user,
  room: state.room
  // receiver: navigation.getParam('receivingUser')
});

export default connect(mapState)(Chat);
