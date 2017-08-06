import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class Row extends Component {

  styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 12,
      fontSize: 16,
    },
  });

  render() {
    const props = this.props;
    return (
        <View style={this.styles.container}>
          <Text style={this.styles.text}>
            {`Room: ${props.room}, ${props.name} ${props.surname}`}
          </Text>
        </View>
      );
    }
}