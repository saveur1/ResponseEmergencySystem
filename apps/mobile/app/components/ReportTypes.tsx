import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

interface ReportTypes {
  onSelected: (value: string) => void;
  selectedEmergency: string;
}

const ReportTypes = ({ onSelected, selectedEmergency }: ReportTypes) => {
  const [isHidden, setIsHidden] = useState(true);
  const [otherText, setOtherText] = useState("");

  const toggleOthers = () => {
    setIsHidden((value) => !value);
    if (!isHidden) {
      onSelected(otherText || "Other");
    }
  };

  const handleSelect = (type: string) => {
    onSelected(type);
    if (type !== "Other") {
      setIsHidden(true);
    }
  };

  const emergencyTypes = [
    { id: 1, type: "Accident", icon: "car-crash", library: FontAwesome5 },
    { id: 2, type: "Fire", icon: "fire-hydrant-alt", library: MaterialIcons },
    {
      id: 3,
      type: "Medical",
      icon: "hand-holding-medical",
      library: FontAwesome6,
    },
    { id: 4, type: "Flood", icon: "flood", library: MaterialIcons },
    { id: 5, type: "Quake", icon: "house-crack", library: FontAwesome6 },
    { id: 6, type: "Robbery", icon: "people-robbery", library: FontAwesome6 },
    { id: 7, type: "Assault", icon: "gun", library: FontAwesome6 },
    {
      id: 8,
      type: "Other",
      icon: "dots-three-horizontal",
      library: Entypo,
      special: true,
    },
  ];

  const renderEmergencyItem = (item: any, index: number) => {
    const IconComponent = item.library;
    const isSelected = selectedEmergency === item.type;
    const backgroundColor = isSelected ? "#E02323" : "transparent";
    const iconColor = isSelected ? "white" : "#424B5A";

    return (
      <TouchableOpacity
        key={item.id}
        className="flex flex-col justify-items-center p-2"
        onPress={() => {
          if (item.special) {
            toggleOthers();
          } else {
            handleSelect(item.type);
          }
        }}
      >
        <View className={`p-2 rounded-xl`} style={{ backgroundColor }}>
          <IconComponent
            name={item.icon}
            size={24}
            color={iconColor}
            className="text-center"
          />
        </View>
        <Text className="text-center">{item.type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="px-6 pt-4">
      <Text className="font-bold text-xl mb-2">Select Emergency Type</Text>
      <View className="border-t p-2">
        <View className="flex flex-row justify-between flex-wrap my-4">
          {emergencyTypes.slice(0, 4).map(renderEmergencyItem)}
        </View>
        <View className="flex flex-row justify-between flex-wrap my-4">
          {emergencyTypes.slice(4).map(renderEmergencyItem)}
        </View>
      </View>

      {/* Others */}
      <TextInput
        id="Others"
        className={`bg-white rounded-xl border focus:border-[#E02323] p-4 $"`}
        placeholder="Stuck in elevator"
        style={{
          display: isHidden ? "none" : "flex",
        }}
        value={otherText}
        onChangeText={(text) => {
          setOtherText(text);
          if (!isHidden) {
            onSelected(text);
          }
        }}
      />
    </View>
  );
};

export default ReportTypes;
