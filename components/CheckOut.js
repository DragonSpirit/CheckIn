import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, ListView} from 'react-native';
import options from '../options'
import CheckIn from "./CheckIn";
import Row from './Row'
export default class CheckOut extends Component {

  async getGuests() {
    return await CheckIn.getDataFromStorage(options.storage_name);
  }

  rawData = [];

  async componentDidMount() {
    this.rawData = await this.getGuests();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({rawData: this.rawData, dataSource: ds.cloneWithRows(this.rawData)});
  }

  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      searchText: ''
    };
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    let data = this.rawData;

    let filteredData = (searchText.length > 0) ? this.filterNotes(searchText, data): data;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.setState({
      dataSource: ds.cloneWithRows(filteredData),
      rawData: data,
    });
  }

  filterNotes(room, notes) {
    return notes.filter((n) => {
      return n.room === parseInt(room);
    });
  }

  styles = StyleSheet.create({
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
    }
  });

  render() {
    return (
        <View>
          {this.state.rawData.length > 0 ? (
                <View>
                  <TextInput
                      style={this.styles.searchBar}
                      value={this.state.searchText}
                      onChange={this.setSearchText.bind(this)}
                      placeholder="Room number"
                  />
                  <ListView
                      dataSource={this.state.dataSource}
                      renderRow={(data) => <Row {...data} />}
                      renderSeparator={(sectionId, rowId) => <View key={rowId} />}
                  />
                </View>
              )
              : (
                  <Text>
                  No data
                  </Text>
            )
          }

        </View>
    );
  }
}
