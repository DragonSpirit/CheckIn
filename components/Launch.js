import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {Actions} from "react-native-router-flux";

/**
 * Base class contains navigation buttons for routing
 */

export default class Launch extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <Text>Initial Page, choose your action</Text>
          <Button onPress={()=> Actions.CheckIn()} title="Go to checkin page" style={{padding:10}}>
            Go to checkin page
          </Button>
          <Button onPress={()=> Actions.CheckOut()} title="Go to checkout page" style={{padding:10}}>
            Go to checkout page
          </Button>
          <Button onPress={()=> Actions.History()} title="Go to history page" style={{padding:10}}>
            Go to history page
          </Button>
        </View>
    );
  }
}
