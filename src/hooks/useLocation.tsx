import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState<LocationObject | undefined>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => setLocation(location),
    );
  }, []);

  return location;
}
