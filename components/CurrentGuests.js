import React, {Component} from 'react';
import {Image,  StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class CurrentGuests extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
        <View>
          <Text>
            CurrentGuests View
          </Text>
        </View>
    );
  }
}