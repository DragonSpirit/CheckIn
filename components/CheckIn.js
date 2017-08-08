import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';
import Storage from '../utils/storage'
import options from '../options';

/**
 * Class representing checking in view
 */

export default class CheckIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: '',
      surname: '',
      room: 0,
      date: new Date(),
      isCurrentlyInRoom: true
    };
  }

  /**
   * Callback for creating new visitors
   */

  onAddVisitor() {
    console.log('### VISITOR - Try to add visitor:');
    this.setState({
      id: (Math.random().toString()).replace('0.','') + Date.now(),
      date: new Date()
    }, async () => {
      let data = await Storage.getDataFromStorage(options.storage_name);
      if (data) {
        data.push(this.state);
        await Storage.setDataToStorage(options.storage_name, data);
      }
    });
  }

  render() {
    return (
        <View>
          <Text>
            Name
          </Text>
          <TextInput
              style={{height: 35, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
          />
          <Text>
            Surname
          </Text>
          <TextInput
              style={{height: 35, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(surname) => this.setState({surname})}
              value={this.state.surname}
          />
          <Text>
            Room number
          </Text>
          <TextInput
              style={{height: 35, borderColor: 'gray', borderWidth: 1}}
              keyboardType='numeric'
              onChangeText={(room) => this.setState({room: parseInt(room)})}
              value={this.state.room ? this.state.room + "" : ""}
          />
          {(this.state.name.length > 0 && this.state.surname.length > 0 && this.state.room > 0) ? (
              <Button title="Add Visitor" onPress={::this.onAddVisitor}>
                Add visitor
              </Button>
          ) : (
              <Text>
                Please fill all input field
              </Text>
          )}
          {/*<Button title="Clear Visitors" onPress={() => CheckIn.clearStorageByKey(options.storage_name)}>
            Clear Visitors
          </Button>*/}
        </View>
    );
  }
}
