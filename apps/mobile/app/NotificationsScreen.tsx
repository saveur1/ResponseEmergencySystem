import React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import NotificationItem from "./components/NotificationItem"
import type { Notification } from "../types";

type NotificationsScreenProps = {}

const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  const navigation = useNavigation()

  const notifications: Notification[] = [
    {
      id: "1",
      type: "emergency",
      title: "Road Accident",
      message: "The incident involved the vehicle MH 41 AK",
      icon: "accident",
      time: "10 min ago",
    },
    {
      id: "2",
      type: "community",
      title: "Check Out New Community post!",
      message: "Free health checkups for those who needs.",
      icon: "community",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "blood",
      title: "Need A+ Blood At Sahyadri Hospital",
      message: "Everyone, we need A+ Blood for my brother. If anyone can help please...",
      icon: "blood",
      time: "2 hours ago",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  listContainer: {
    padding: 16,
  },
})

export default NotificationsScreen

