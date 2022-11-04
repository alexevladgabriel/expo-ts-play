import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import MapView from "react-native-maps";
import useLocation from "./src/hooks/useLocation";
import colors from "tailwindcss/colors";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Bars3BottomLeftIcon,
  FunnelIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export default function App() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const location = useLocation();
  const snapPoints = useMemo(() => ["20%", "50%", "80%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  return (
    <GestureHandlerRootView>
      <View className="w-full h-full">
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"dark-content"}
        />
        {!location ? (
          <View className="flex-1 items-center justify-center font-semibold">
            <Text className="text-lg">Loading...</Text>
          </View>
        ) : (
          <View>
            <MapView
              className="w-full h-full -z-999"
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              showsMyLocationButton={false}
              toolbarEnabled={false}
              showsCompass={false}
              initialCamera={{
                center: location.coords,
                heading: 4,
                pitch: 4,
                zoom: 16,
                altitude: 4,
              }}
            ></MapView>
            <View className="absolute mt-12 ml-4 ">
              <TouchableHighlight
                className="flex-grow bg-white rounded-full shadow-lg shadow-slate-900"
                onPress={() => console.log("Pressed")}
                activeOpacity={1}
                underlayColor={colors.white}
              >
                <View className="flex-row justify-center items-center p-3 focus:bg-white">
                  <Bars3BottomLeftIcon fill={colors.slate[800]} />
                </View>
              </TouchableHighlight>
            </View>
            <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-end">
              <View className="bg-white w-full h-1/5 rounded-t-3xl">
                <View className="flex-row justify-center">
                  <View className="w-[52] mt-2 h-[6px] rounded-full bg-[#e9eaee] items-center justify-center" />
                </View>
              </View>
              <BottomSheet
                style={{ zIndex: 999 }}
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enableContentPanningGesture
                enableHandlePanningGesture
                enableOverDrag
              >
                <View className="flex-1 items-center">
                <View className="px-5 py-2">
                  <View className="flex-row items-center bg-zinc-100 rounded-lg pl-2">
                    <View className="bg-[#eaeaec] rounded-full p-2">
                      <MagnifyingGlassIcon fill={colors.slate[800]} />
                    </View>
                    <TextInput
                      // onPressIn={}
                      className="flex-1 h-14 rounded-md bg-zinc-100 placeholder:text-lg placeholder:font-bold placeholder:pl-2"
                      placeholder="Încotro?"
                      placeholderTextColor={colors.slate[800]}
                    />
                  </View>
                  <View className="mt-2 flex-row space-x-4 w-full">
                    <TouchableHighlight
                      className="flex-grow rounded-lg"
                      onPress={() => console.log("Pressed")}
                      activeOpacity={1}
                      underlayColor={colors.slate[100]}
                    >
                      <View className="flex-row justify-center items-center border-2 box-border border-zinc-200 px-8 py-4 rounded-lg focus:bg-white">
                        <GlobeAltIcon fill={colors.slate[800]} />
                        <Text className="ml-2 font-black">Trasee</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      className="flex-grow rounded-lg"
                      onPress={handleExpandPress}
                      activeOpacity={1}
                      underlayColor={colors.slate[100]}
                    >
                      <View className="flex-row justify-center items-center border-2 box-border border-zinc-200 px-8 py-4 rounded-lg">
                        <FunnelIcon fill={colors.slate[800]} />
                        <Text className="ml-2 font-black">Filtre</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
                </View>
              </BottomSheet>
            </View>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: Dimensions.get("window").height,
//     width: Dimensions.get("window").width,
//     justifyContent: "flex-start",
//     alignItems: "stretch",
//     zIndex: -100,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   myLocationButton: {
//     backgroundColor: "red",
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     padding: 15,
//     elevation: 3,
//     alignItems: "center",
//     alignSelf: "flex-end",
//     justifyContent: "center",
//     borderRadius: 50,
//   },
// });
