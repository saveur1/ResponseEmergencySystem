import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import ChangeLocation from "./ChangeLocation";

interface LocationProps {
  location: {
    latitude: number;
    longitude: number;
  };
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

const { height } = Dimensions.get("window");

const Locations = ({ location, setLocation }: LocationProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsBottomSheetOpen(false);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          handleCloseBottomSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <View className="mt-4 py-4 px-6">
        <Text className="font-bold text-xl mb-2">Location</Text>
        <View className="border-t"></View>
      </View>

      <View>
        <View className="bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-4 mb-4">
          <Text style={{ fontWeight: "500", color: "#212121" }}>
            <EvilIcons name="location" size={20} color="black" />
            {location.latitude === 0 && location.longitude === 0
              ? "Select Location"
              : `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          </Text>
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <Text className="text-[#E02323] font-bold">Change</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isBottomSheetOpen}
          transparent
          animationType="none"
          onRequestClose={handleCloseBottomSheet}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={handleCloseBottomSheet}
          >
            <ChangeLocation location={location} setLocation={setLocation} />
            {/* <Animated.View
              style={[
                styles.bottomSheetContainer,
                {
                  transform: [{ translateY: translateY }],
                },
              ]}
            >
              <View {...panResponder.panHandlers}></View>
            </Animated.View> */}
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default Locations;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "75%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  dragIndicator: {
    width: 60,
    height: 6,
    backgroundColor: "#DDDDDD",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
});
