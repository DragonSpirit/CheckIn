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
      date: Date.now(),
      isCurrentlyInRoom: true
    };
  }

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

  onAddVisitor() {
    console.log('### VISITOR - Try to add visitor:');
    this.setState({
      id: (Math.random().toString()).replace('0.','') + Date.now(),
      data: Date.now()
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
        </View>
    );
  }
}
