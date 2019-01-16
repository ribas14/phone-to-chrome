import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { openChat, sendMessage } from "../store";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    openChat({ user: this.props.user, room: this.props.room });
  }

  send(message) {
    sendMessage(message.text, this.props.user, this.props.room);
  }

  render() {
    return (
      <GiftedChat
      messages={this.props.messages}
      user={{
        _id: this.props.user.id
      }}
      onSend={message => this.send(message[0])}
    />
      // <ScrollView>
      //   {
      //     this.props.messages && 
      //     this.props.messages.reverse().map((item, index) => (
      //         <View key={index}>
      //           <Text>{item.text}</Text>
      //         </View>
      //     ))
      //   }
      // </ScrollView>
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
