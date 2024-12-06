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
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
    </Stack.Navigator>
  );
}
