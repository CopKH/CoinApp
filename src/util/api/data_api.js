import axios from 'axios';
import {addDataStore} from '../../store/dataStore';
import {addDataStoreDetail} from '../../store/dataStoreDetail';

const optinos = {
  headers: {
    'x-access-token':
      'coinrankingf5138c5574a37109bdc78d949d984d5d3f9107e1dda2dc50',
  },
};

export const DataAPI = async limit => {
  // console.log('NotificationsAPI access_token', access_token);
  const response = await axios
    .get(`https://api.coinranking.com/v2/coins?limit=${limit}`, optinos)
    .catch(async err => {
      console.log('err DataAPI', err.response.data);
      // Alert.alert(err.response.data.message.th);
    });
  // console.log('response DataAPI', response?.data.data.coins);
  return dispatch => {
    // console.log('response', response?.data.data.coins.length);
    dispatch(addDataStore(response?.data.data.coins));
  };
};

export const DataSearchAPI = async data => {
  // console.log('NotificationsAPI access_token', access_token);
  const response = await axios
    .get(`https://api.coinranking.com/v2/coins?search=${data}`, optinos)
    .catch(async err => {
      console.log('err DataAPI', err.response.data);
      // Alert.alert(err.response.data.message.th);
    });
  console.log('response DataAPI', response?.data.data.coins);
  return dispatch => {
    
    dispatch(addDataStore(response?.data.data.coins));
  };
};

export const DataDetailAPI = async uuid => {
  const response = await axios
    .get(`https://api.coinranking.com/v2/coin/${uuid}`, optinos)
    .catch(async err => {
      console.log('err DataDetailAPI', err.response.data);
      // Alert.alert(err.response.data.message.th);
    });

  return dispatch => {
    dispatch(addDataStoreDetail(response?.data?.data?.coin));
  };
};
