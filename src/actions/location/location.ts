import {Location} from '@/infrastructure/interfaces/locations';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },

      error => {
        console.log(`Failed to get location ${error}`);
        reject(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  });
};

export const watchCurrentLocation = (
  locationCallback: (location: Location) => void,
): number => {
  return Geolocation.watchPosition(
    info => {
      locationCallback({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    },
    error => {
      throw new Error("Can't get watchPosition");
    },
    {enableHighAccuracy: true},
  );
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
