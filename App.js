import React, {Component} from 'react';
import {Image,  StyleSheet, Text, TextInput, View} from 'react-native';
import CheckIn from './components/CheckIn';
import Launch from './components/Launch'
import CheckOut from './components/CheckOut'
import History from './components/History'
import CurrentGuests from './components/CurrentGuests'
import {Router, Scene} from 'react-native-router-flux'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Router>
            <Scene key="root">
              <Scene key="launch" component={Launch} title="GuestBook" initial/>
              <Scene key="CheckIn" component={CheckIn} title="CheckIn" />
              <Scene key="CheckOut" component={CheckOut} title="CheckOut"/>
              <Scene key="History" component={History} title="History"/>
              <Scene key="CurrentGuests" component={CurrentGuests} title="CurrentGuests"/>
            </Scene>
          </Router>
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

