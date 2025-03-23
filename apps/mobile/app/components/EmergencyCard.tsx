import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import LocationBadge from "./LocationBadge";
import type { Emergency } from "../../types";
import EmergencyIcon from "./EmergencyIcon"

type EmergencyCardProps = {
  emergency: Emergency
  onDelete?: () => void
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ emergency, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LocationBadge location={emergency.location} />

        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="trash-bin" size={24} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <EmergencyIcon type={emergency.icon} size={40} />

        <View style={styles.details}>
          <Text style={styles.type}>{emergency.type}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {emergency.description}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteButton: {
    padding: 4,
  },
  content: {
    flexDirection: "row",
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  type: {
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
})

export default EmergencyCard

