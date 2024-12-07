import {
  clearWatchLocation,
  getCurrentLocation,
  watchCurrentLocation,
} from '@/actions/location/location';
import {Location} from '@/infrastructure/interfaces/locations';
import {create} from 'zustand';

interface LocationState {
  lastKnownLocation: Location | null;
  userLocationsHistory: Location[];
  watchId: number | null;

  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationsHistory: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();

    set({lastKnownLocation: location});
    return location;
  },

  watchLocation: () => {
    const watchId = get().watchId;

    if (watchId !== null) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation(location => {
      set({
        lastKnownLocation: location,
        userLocationsHistory: [...get().userLocationsHistory, location],
      });
    });

    set({watchId: id});
  },

  clearWatchLocation: () => {
    const watchId = get().watchId;

    if (watchId !== null) {
      clearWatchLocation(watchId);
    }
  },
}));
