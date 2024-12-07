import {Platform, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {Location} from '@/infrastructure/interfaces/locations';
import FAB from '@/presentation/components/ui/FAB';
import {useLocationStore} from '@/presentation/store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
}

export default function Map({
  showsUserLocation = true,
  initialLocation,
}: Props) {
  const [isFollowUser, setIsFollowUser] = useState(true);
  const [showPolyline, setShowPolyline] = useState(true);

  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);

  const {
    getLocation,
    lastKnownLocation,
    watchLocation,
    clearWatchLocation,
    userLocationsHistory,
  } = useLocationStore();

  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: location,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraToLocation(location);
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowUser) {
      moveCameraToLocation(lastKnownLocation);
    }

    return () => {};
  }, [lastKnownLocation, isFollowUser]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        onTouchStart={() => setIsFollowUser(false)}
        style={styles.map}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {showPolyline && (
          <Polyline
            coordinates={userLocationsHistory}
            strokeColor="#1E90FF"
            strokeWidth={5}
          />
        )}

        {/* <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="This is the title"
          description="Some shor description"
        /> */}
      </MapView>

      <FAB
        iconName={showPolyline ? 'eye-off-outline' : 'eye-off-outline'}
        onPress={() => setShowPolyline(!showPolyline)}
        style={{bottom: 150, right: 20}}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{bottom: 30, right: 20}}
      />

      <FAB
        iconName={isFollowUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={() => setIsFollowUser(!isFollowUser)}
        style={{bottom: 90, right: 20}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {flex: 1},
});
