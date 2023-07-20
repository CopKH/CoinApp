import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Store} from './src/util/store';
import {Provider} from 'react-redux';
import MainScreen from './src/screens/main_screen';
function App() {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <MainScreen />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
