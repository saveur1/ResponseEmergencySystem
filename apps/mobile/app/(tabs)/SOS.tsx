import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmergencyCard from '../components/EmergencyCard';
import TabSelector from '../components/TabSelection';

interface Emergency {
  id: string;
  type: string;
  location: string;
  description: string;
  icon: string;
}

const SOS = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('reported-by-you');
  
  const emergencies: Emergency[] = [
    {
      id: '1',
      type: 'Road Accident',
      location: 'Kothrud, Pune, 411038',
      description: 'The incident involved the vehicle MH 41 AK 6543, which was involved in a collision between a car and a motorcycle. The accident resulted in a serious head injury for the biker. Urgent emergency services are needed at this location.',
      icon: ""
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergencies</Text>
      </View>
      
      <TabSelector
        tabs={[
          { id: 'reported-by-you', label: 'Reported By You' },
          { id: 'reported-by-others', label: 'Reported By Others' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <FlatList
        data={emergencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmergencyCard
            emergency={ item }
            // onPress={() => navigation.navigate('ViewEmergency', { emergency: item })}
            onDelete={() => {/* Handle delete */}}
            // showDeleteButton={activeTab === 'reported-by-you'}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
});

export default SOS;