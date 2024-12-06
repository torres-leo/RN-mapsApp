import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PermissionScreen from '@/presentation/screens/permissions/PermissionScreen';
import LoadingScreen from '@/presentation/screens/loading/LoadingScreen';
import MapScreen from '@/presentation/screens/maps/MapScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  MapScreen: undefined;
  PermissionScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

type ScreenConfig = {
  name: keyof RootStackParams;
  component: React.ComponentType<any>;
};

const screens: ScreenConfig[] = [
  {name: 'LoadingScreen', component: LoadingScreen},
  {name: 'MapScreen', component: MapScreen},
  {name: 'PermissionScreen', component: PermissionScreen},
];

const renderScreens = screens.map(({name, component}) => (
  <Stack.Screen key={name} name={name} component={component} />
));

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {renderScreens}
    </Stack.Navigator>
  );
}
