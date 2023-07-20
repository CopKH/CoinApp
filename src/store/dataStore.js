import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: [],
};

const DataStore = createSlice({
  name: 'DataStore',
  initialState: initialState,
  reducers: {
    addDataStore: (state, action) => {
      console.log('addDataStore');
      state.data = action.payload;
    },
  },
});

export const {addDataStore} = DataStore.actions;

export default DataStore.reducer;
