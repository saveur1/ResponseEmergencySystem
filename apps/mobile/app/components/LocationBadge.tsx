import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type LocationBadgeProps = {
  location: string
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ location }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={16} color="#666666" />
      <Text style={styles.text}>{location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
})

export default LocationBadge

