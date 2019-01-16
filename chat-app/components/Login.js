import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../store';
import { connect } from "react-redux";

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type, value) {
    this.setState({ [type]: value });
  }

  handleSubmit() {
    login({stringQr: this.props.stringQr, roomStringQr: this.props.roomStringQr}, this.props.navigation);
  }

  componentDidMount() {
    if (this.props.roomStringQr) {
      login({stringQr: this.props.stringQr, roomStringQr: this.props.roomStringQr}, this.props.navigation);
    } else {
      this.props.navigation.navigate("ScanScreen")
    }
  }

  render() {
    return (
      <View style={ styles.container }>
      </View>
    );
  }
}

const mapState = (state, { navigation }) => ({
  stringQr: state.stringQr,
  roomStringQr: state.roomStringQr
});

export default connect(mapState)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    height: '100%',
    width: '100%'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    marginTop: 10
  },
  button: {
    width: '75%',
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  }
});