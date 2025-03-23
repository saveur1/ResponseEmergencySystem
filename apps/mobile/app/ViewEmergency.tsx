import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

import EmergencyIcon from "./components/EmergencyIcon"
import LocationBadge from "./components/LocationBadge"
import type { Emergency } from "../types";

type ViewEmergencyScreenProps = {}
type RouteParams = {
  params: {
    emergency: Emergency
  }
}

const ViewEmergencyScreen: React.FC<ViewEmergencyScreenProps> = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>()
  const navigation = useNavigation()
  const { emergency } = route.params

  const emergencyTips = [
    "Stay Calm & Check for injuries – Assess yourself and passengers for injuries.",
    "Move to Safety (if Possible) – If the vehicle is drivable, move it to the side of the road. If not, turn on hazard lights.",
    "Call Emergency Services – Dial 112 for medical and police assistance.",
    "Do Not Leave the Scene – Stay until authorities arrive unless medical attention is needed.",
    "Exchange Information – Share contact and insurance details with other involved parties.",
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>{emergency.type}</Text>
      </View>

      <View style={styles.iconContainer}>
        <EmergencyIcon type={emergency.icon} size={60} />
      </View>

      <LocationBadge location={emergency.location} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{emergency.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Images/Videos</Text>
        <View style={styles.imagesContainer}>
          <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.thumbnail} />
          <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.thumbnail} />
          <Image source={{ uri: "/placeholder.svg?height=80&width=80" }} style={styles.thumbnail} />
        </View>

        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="play" size={16} color="#000000" />
          <Text style={styles.audioText}>recorded audio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <View style={styles.tipsHeader}>
          <Ionicons name="information-circle-outline" size={20} color="#FF3B30" />
          <Text style={styles.tipsTitle}>Tips that might be helpful</Text>
        </View>

        <Text style={styles.tipsSubtitle}>If you are in an accident</Text>

        {emergencyTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={styles.tipNumber}>{index + 1}.</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333333",
  },
  imagesContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 8,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  audioText: {
    marginLeft: 8,
    color: "#333333",
  },
  tipsContainer: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    marginVertical: 16,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF3B30",
    marginLeft: 4,
  },
  tipsSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#000000",
  },
  tipItem: {
    flexDirection: "row",
    marginVertical: 4,
  },
  tipNumber: {
    width: 16,
    fontWeight: "500",
    color: "#333333",
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#333333",
  },
})

export default ViewEmergencyScreen

