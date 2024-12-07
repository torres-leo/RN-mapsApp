import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Map from '@/presentation/components/maps/Map';
import {useLocationStore} from '@/presentation/store/location/useLocationStore';
import LoadingScreen from '../loading/LoadingScreen';

export default function MapScreen() {
  const {lastKnownLocation, getLocation} = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Map initialLocation={lastKnownLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
