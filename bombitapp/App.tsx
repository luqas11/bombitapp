import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import CustomNavigator from './src/navigation';
import {ModalContextProvider} from './src/context';

const App = (): JSX.Element => {
  return (
    <ModalContextProvider>
      <NavigationContainer>
        <CustomNavigator />
      </NavigationContainer>
    </ModalContextProvider>
  );
};

export default App;
