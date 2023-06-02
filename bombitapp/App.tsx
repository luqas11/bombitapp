import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import CustomNavigator from './src/navigation';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <CustomNavigator />
    </NavigationContainer>
  );
};

export default App;
