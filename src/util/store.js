import {configureStore} from '@reduxjs/toolkit';
import dataStore from '../store/dataStore';
import dataStoreDetail from '../store/dataStoreDetail';

export const Store = configureStore({
  reducer: {
    DataStore: dataStore,
    DataStoreDetail: dataStoreDetail,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
