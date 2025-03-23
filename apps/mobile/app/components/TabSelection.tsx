import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type Tab = {
  id: string
  label: string
}

type TabSelectorProps = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF3B30",
  },
  tabText: {
    fontSize: 14,
    color: "#999999",
  },
  activeTabText: {
    color: "#FF3B30",
    fontWeight: "500",
  },
})

export default TabSelector