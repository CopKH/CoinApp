import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: {},
};

const DataStoreDetail = createSlice({
  name: 'dataStoreDetail',
  initialState: initialState,
  reducers: {
    addDataStoreDetail: (state, action) => {
      console.log('addDataStoreDetail');
      // console.log('action.payload', action.payload);
      state.data = action.payload;
    },
  },
});

export const {addDataStoreDetail} = DataStoreDetail.actions;

export default DataStoreDetail.reducer;
