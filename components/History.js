import React, {Component} from 'react';
import {Image,  StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class History extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
        <View>
          <Text>
            History View
          </Text>
        </View>
    );
  }
}