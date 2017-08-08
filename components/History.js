import React, {Component} from 'react';
import {Text, View, ListView} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Storage from '../utils/storage'
import options from "../options";


/**
 * Class representing history view by day
 */

export default class History extends Component {

  rawData = [];
  ds = null;

  async componentWillMount() {
    this.rawData = await Storage.getDataFromStorage(options.storage_name);

    let filteredData = this.rawData.filter((el) =>
        Moment(el.date).isSame(Moment(this.state.selectedDate), 'day')
    );
    this.setState({ dataSource: this.ds.cloneWithRows(filteredData),
      filteredData});
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      filteredData: [],
    };
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  /**
   * Callback which call when user choose date
   * @param selectedDate date for filter
   */

  onDateSelect(selectedDate) {
    console.log(`### HISTORY - Select date is ${selectedDate}`);
    this.setState({
      filteredData: [],
      dataSource: this.ds.cloneWithRows([]),
      selectedDate
    }, () => {
      console.log(`### HISTORY - Prepare for filtering for ${JSON.stringify(this.rawData)}`);

      let filteredData = this.rawData.filter((el) =>
         Moment(el.date).isSame(Moment(selectedDate), 'day')
      );
      console.log(`### HISTORY - Filtered data is ${JSON.stringify(filteredData)}`);

      this.setState({
        dataSource: this.ds.cloneWithRows(filteredData),
        filteredData
      }, () => console.log(`### HISTORY - Update data source complete`));
    });
  }

  _renderRow(data) {
    const {room, name, surname, isCurrentlyInRoom} = data;
    return (
        <View>
          <Text>
            {`Room: ${room}\nName: ${name} \nSurname: ${surname} \nStatus: ${isCurrentlyInRoom ? 'In Room': 'Leave room'}\n`}
          </Text>
        </View>
    );
  }

  render() {
    return (
        <View>
          <Calendar
              onChange={::this.onDateSelect}
              selected={this.state.selectedDate}
              minDate={Moment().add(-10, 'days').startOf('day')}
              maxDate={Moment().add(10, 'years').startOf('day')}
          />
          {this.state.filteredData.length > 0 &&
          <ListView
              dataSource={this.state.dataSource}
              renderRow={::this._renderRow}
              renderSeparator={(sectionId, rowId) => <View key={rowId}/>}
              enableEmptySections={true}
          />
          }
        </View>
    );
  }
}