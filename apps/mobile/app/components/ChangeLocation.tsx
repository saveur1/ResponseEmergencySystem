import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapPressEvent,
} from "react-native-maps";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import * as Location from "expo-location";

interface ChangeLocationProps {
  location: {
    latitude: number;
    longitude: number;
  };
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

const ChangeLocation = ({ location, setLocation }: ChangeLocationProps) => {
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [loading, setLoading] = useState(false);

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    setLocation(selectedLocation);
    router.navigate("/ReportEmergency");
  };

  const handleGetCurrentLocation = async () => {
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access location was denied"
        );
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      setSelectedLocation({ latitude, longitude });
      setLocation({latitude, longitude})
      Alert.alert("Success", "Current location detected");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get your current location");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="absolute h-full w-full bg-black/30 backdrop-blur-sm z-99 p-4">
      <View className="bg-white h-fit flex flex-col p-4 mt-40 rounded-sm">
        <View className="m-2 p-2">
          <TouchableOpacity
            className="flex flex-row gap-2 content-center"
            onPress={handleBack}
          >
            <AntDesign name="arrowleft" size={20} color="grey" />
            <Text className="font-bold">Select Location</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex flex-row items-center gap-2 bg-white border rounded-xl border-grey/20 p-3 mb-3"
          onPress={handleGetCurrentLocation}
          disabled={loading}
        >
          <Ionicons name="locate" size={20} color="#E02323" />
          <Text>
            {loading ? "Getting your location..." : "Use my current location"}
          </Text>
        </TouchableOpacity>

        <View className="h-80 my-4 rounded-xl">
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={handleMapPress}
          >
            <Marker coordinate={selectedLocation} />
          </MapView>
          <View className="absolute bottom-3 left-0 right-0 flex items-center"></View>
          <Text className="bg-white px-2 py-1 rounded-md text-xs">
            Tap on the map to select location
          </Text>
        </View>
      </View>

      <View className="p-4">
        <TouchableOpacity
          className="bg-[#E02323] rounded-xl flex flex-row w-full justify-between p-4"
          onPress={handleConfirmLocation}
        >
          <Text className="text-center w-full text-white">
            Confirm Location
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeLocation;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
