import React from 'react';
import './gesture-handler';

import StackNavigator from './presentation/navigation/StackNavigator';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import PermissionsChecker from './presentation/providers/PermissionsChecker';

export default function MapsApp() {
  return (
    <ThemeContextProvider>
      <PermissionsChecker>
        <StackNavigator />
      </PermissionsChecker>
    </ThemeContextProvider>
  );
}
