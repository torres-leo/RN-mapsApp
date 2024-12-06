import React, {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootStackParams} from '@/presentation/navigation/StackNavigator';
import {usePermissionStore} from '@/presentation/store/permissions/usePermissionStore';
import {StackNavigationProp} from '@react-navigation/stack';

export default function PermissionsChecker({children}: PropsWithChildren) {
  const {locationStatus, checkLocationPermission} = usePermissionStore();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.reset({
        routes: [{name: 'MapScreen'}],
      });
    } else if (locationStatus !== 'undetermined') {
      navigation.reset({
        routes: [{name: 'PermissionScreen'}],
      });
    }
  }, [locationStatus]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
}
