import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmergencyCard from '../components/EmergencyCard';
import TabSelector from '../components/TabSelection';
import { Emergency } from '@/types';
import { collection, orderBy, where, query, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

const SOS = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('reported-by-you');

  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

  React.useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        let emergenciesQuery = query(
          collection(db, 'emergencies'),
          orderBy('timestamp', 'desc')
        );
        // if (activeTab === "reported-by-you" && currentUser) {
        //   emergenciesQuery = query(
        //     collection(db, "emergencies"),
        //     where("userId", "==", currentUser.uid),
        //     orderBy("timestamp", "desc")
        //   );
        // } else {
        // Keep the existing query
        // }

        const querySnapshot = await getDocs(emergenciesQuery);
        const emergenciesData: Emergency[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          emergenciesData.push({
            id: doc.id,
            type: data.type,
            location:
              data.location?.address ||
              `${data.location?.latitude}, ${data.location?.longitude}`,
            description: data.description,
            // icon: "",
            timestamp: data.timestamp,
            status: data.status,
            images: data.images || [],
          });
        });

        setEmergencies(emergenciesData);
      } catch (error) {
        console.error('Error fetching emergencies:', error);
      }
    };

    fetchEmergencies();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergencies</Text>
      </View>

      <TabSelector
        tabs={[
          { id: 'reported-by-you', label: 'Reported By You' },
          { id: 'reported-by-others', label: 'Reported By Others' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <FlatList
        data={emergencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmergencyCard
            emergency={item}
            // onPress={() => navigation.navigate('ViewEmergency', { emergency: item })}
            onDelete={() => {
              /* Handle delete */
            }}
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
