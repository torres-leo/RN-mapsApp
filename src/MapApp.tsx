import React from 'react';
import './gesture-handler';

import StackNavigator from './presentation/navigation/StackNavigator';
import {ThemeContextProvider} from './presentation/context/ThemeContext';

export default function MapsApp() {
  return (
    <ThemeContextProvider>
      <StackNavigator />
    </ThemeContextProvider>
  );
}
