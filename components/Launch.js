import React, {Component} from 'react';
import {Image,  StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class Launch extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
        <View>
          <Text>Inital Page, choose your action</Text>
          <Button onPress={()=> Actions.CheckIn()} title="Go to checkin page" style={{padding:10}}>
            Go to checkin page
          </Button>
          <Button onPress={()=> Actions.CheckOut()} title="Go to checkout page" style={{padding:10}}>
            Go to checkout page
          </Button>
          <Button onPress={()=> Actions.History()} title="Go to history page" style={{padding:10}}>
            Go to history page
          </Button>
          <Button onPress={()=> Actions.CurrentGuests()} title="Go to current guests page" style={{padding:10}}>
            Go to current guests page
          </Button>
        </View>
    );
  }
}
