import React from "react"
import { View, StyleSheet } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

type EmergencyIconProps = {
  type: string
  size?: number
}

const EmergencyIcon: React.FC<EmergencyIconProps> = ({ type, size = 24 }) => {
  const getIconContent = () => {
    switch (type) {
      case "accident":
        return <MaterialIcons name="directions-car" size={size * 0.6} color="#FFFFFF" />
      case "medical":
        return <Ionicons name="medkit" size={size * 0.6} color="#FFFFFF" />
      case "fire":
        return <MaterialIcons name="local-fire-department" size={size * 0.6} color="#FFFFFF" />
      default:
        return <Ionicons name="alert-circle" size={size * 0.6} color="#FFFFFF" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "accident":
        return "#FF3B30"
      case "medical":
        return "#FF3B30"
      case "fire":
        return "#FF9500"
      default:
        return "#FF3B30"
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {getIconContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})

export default EmergencyIcon

