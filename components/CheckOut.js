import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, ListView, TouchableOpacity} from 'react-native';
import options from '../options'
import Storage from '../utils/storage'

/**
 * Class representing checking out view
 */

export default class CheckOut extends Component {

  async getGuests() {
    return await Storage.getDataFromStorage(options.storage_name);
  }

  rawData = [];
  ds = null;

  async componentWillMount() {
    this.rawData = await this.getGuests();
    this.rawData = this.rawData.filter((i) => i.isCurrentlyInRoom);
    this.setState({rawData: this.rawData, dataSource: this.ds.cloneWithRows(this.rawData)});
  }

  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      searchText: ''
    };
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  /**
   * Filter array pf visitors by room number
   * @param event
   */

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    let data = this.rawData;

    let filteredData = (searchText.length > 0) ? this.filterVisitors(searchText, data) : data;

    this.setState({
      dataSource: this.ds.cloneWithRows(filteredData),
      rawData: data,
    });
  }

  filterVisitors(room, visitors) {
    return visitors.filter((v) =>
       v.room === parseInt(room) && v.isCurrentlyInRoom
    );
  }

  onItemClick(item) {
    let index =  this.state.rawData.findIndex((i) => i.id === item.id);
    let data = this.state.rawData.slice();
    data[index].isCurrentlyInRoom = false;

    console.log(`### CheckOut - Update raw data to ${JSON.stringify(data)}`);

    let visibleData = data.filter((i) => i.isCurrentlyInRoom);

    this.setState({
      dataSource: this.ds.cloneWithRows(visibleData),
      rawData: data
    }, async () => {
          await Storage.setDataToStorage(options.storage_name, data);
          alert("Successfully checked out guest");
      }
    );
  }

  /**
   * Render row using data
   * @param {object} data
   * @private
   */

  _renderRow(data) {
    const {room, name, surname} = data;
    return (
        <TouchableOpacity
            style={this.styles.container}
            onPress={() => this.onItemClick(data)}>
          <Text style={this.styles.text}>
            {`Room: ${room}, ${name} ${surname}`}
          </Text>
        </TouchableOpacity>
    );
  }

  render() {
    return (
        <View>
          {this.state.rawData.length > 0 ? (
                <View>
                  <TextInput
                      style={this.styles.searchBar}
                      value={this.state.searchText}
                      onChange={::this.setSearchText}
                      placeholder="Room number"
                  />
                  <ListView
                      dataSource={this.state.dataSource}
                      renderRow={::this._renderRow}
                      renderSeparator={(sectionId, rowId) => <View key={rowId} />}
                      enableEmptySections={true}
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

  styles = StyleSheet.create({
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
    },
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 12,
      fontSize: 16,
    }
  });
}
