import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class CheckOut extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
        <View>
          <Text>
            CheckOut View
          </Text>
        </View>
    );
  }
}
