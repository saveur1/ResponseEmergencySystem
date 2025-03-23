import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import EmergencyIcon from "./EmergencyIcon"
import type { Notification } from "../../types"

type NotificationItemProps = {
  notification: Notification
  onPress?: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {notification.type === "emergency" ? (
          <EmergencyIcon type={notification.icon} size={40} />
        ) : notification.type === "blood" ? (
          <View style={styles.bloodIconContainer}>
            <Ionicons name="notifications" size={20} color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.communityIconContainer}>
            <Ionicons name="notifications" size={20} color="#FFFFFF" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  bloodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  communityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF9500",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666666",
  },
})

export default NotificationItem

