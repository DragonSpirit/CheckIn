import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';
import options from '../options';

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
   * Get data from internal async storage by key
   * @param {string} key - The string containing key to access
   * @returns {Promise.<Array>}
   */

  static async getDataFromStorage (key) {
    console.log(`### STORAGE - Reading key: ${key}`);
    try {
      let data = await AsyncStorage.getItem(key);
      if (data !== null){
        console.log('### STORAGE - Read result: ' + typeof(JSON.parse(data)) + ':'  + JSON.stringify(data));
        return JSON.parse(data);
      }else {
        console.log("### STORAGE - Storage.read(): Not found");
        return [];
      }
    } catch (err) {
      console.log(`### STORAGE - Storage.read(): error: + ${err.message}`);
      return [];
    }
  }

  /**
   * Put data to internal async storage
   * @param {string} key - The string containing key to access
   * @param {string} data - The string containing stringify data
   * @returns {Promise.<boolean>}
   */

   static async setDataToStorage (key, data){
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log(`### STORAGE - Save: Saved key: ${key} with data ${JSON.stringify(data)}`);
      return true;
    } catch(err) {
      console.log(`### STORAGE - Save: ERROR SAVING ${key} with data ${JSON.stringify(data)}`);
      return false;
    }
  }

  /**
   * Clear internal async storage by key
   * @param {string} key - The string containing key to access
   * @returns {Promise.<boolean>}
   */

  static async clearStorageByKey (key){
     try {
        await AsyncStorage.removeItem(key, '');
        console.log(`### STORAGE - remove by key ${key}`);
        return true;
    } catch(err) {
        console.log(`### STORAGE - ERROR ${err}`);
        return false;
    }
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
      let data = await CheckIn.getDataFromStorage(options.storage_name);
      if (data) {
        data.push(this.state);
        await CheckIn.setDataToStorage(options.storage_name, data);
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
