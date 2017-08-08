import {AsyncStorage} from 'react-native'

/**
 * Class representing wrapper for async storage
 */

export default class Storage {

  /**
   * Get data from internal async storage by key
   * @param {string} key - The string containing key to access
   * @returns {Promise.<Array>}
   */

  static async getDataFromStorage(key) {
    console.log(`### STORAGE - Reading key: ${key}`);
    try {
      let data = await
          AsyncStorage.getItem(key);
      if (data !== null) {
        console.log('### STORAGE - Read result: ' + typeof(JSON.parse(data)) + ':' + JSON.stringify(data));
        return JSON.parse(data);
      } else {
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

  static async setDataToStorage(key, data) {
    try {
      await
          AsyncStorage.setItem(key, JSON.stringify(data));
      console.log(`### STORAGE - Save: Saved key: ${key} with data ${JSON.stringify(data)}`);
      return true;
    } catch (err) {
      console.log(`### STORAGE - Save: ERROR SAVING ${key} with data ${JSON.stringify(data)}`);
      return false;
    }
  }

  /**
   * Clear internal async storage by key
   * @param {string} key - The string containing key to access
   * @returns {Promise.<boolean>}
   */

  static async clearStorageByKey(key) {
    try {
      await
          AsyncStorage.removeItem(key, '');
      console.log(`### STORAGE - remove by key ${key}`);
      return true;
    } catch (err) {
      console.log(`### STORAGE - ERROR ${err}`);
      return false;
    }
  }

}