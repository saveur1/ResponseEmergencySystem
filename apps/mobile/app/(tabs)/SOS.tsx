import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmergencyCard from '../components/EmergencyCard';
import TabSelector from '../components/TabSelection';
import { Emergency } from '@/types';
import {
  collection,
  orderBy,
  where,
  query,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { getItemAsync } from 'expo-secure-store';
import { router } from 'expo-router';

const SOS = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('reported-by-you');

  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

  React.useEffect(() => {
    const fetchEmergencies = async () => {
      const currentUserId = await getItemAsync('userId');
      try {
        let emergenciesQuery;

        if (activeTab === 'reported-by-you') {
          emergenciesQuery = query(
            collection(db, 'emergencies'),
            where('reportedBy', '==', currentUserId),
            orderBy('timestamp', 'desc')
          );
        } else {
          emergenciesQuery = query(
            collection(db, 'emergencies'),
            orderBy('timestamp', 'desc')
          );
        }

        const querySnapshot = await getDocs(emergenciesQuery);
        const emergenciesData: Emergency[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (activeTab === 'reported-by-others') {
            if (data.reportedBy === currentUserId) return;
            if (data.status === 'cancelled') return;
          }

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
            reportedBy: data.reportedBy,
          });
        });

        setEmergencies(emergenciesData);
      } catch (error) {
        console.error('Error fetching emergencies:', error);
      }
    };

    fetchEmergencies();
  }, [activeTab]);

  const HandleUpdate = async (emergencyId: string) => {
    try {
      const emergencyRef = doc(db, 'emergencies', emergencyId);
      await updateDoc(emergencyRef, {
        status: 'cancelled',
      });
      setEmergencies((prevEmergencies) =>
        prevEmergencies.map((emergency) =>
          emergency.id === emergencyId
            ? { ...emergency, status: 'cancelled' }
            : emergency
        )
      );
    } catch (error) {
      console.error('Error updating emergency:', error);
    }
  };

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

      {emergencies.length === 0 && activeTab === 'reported-by-you' ? (
        <Text style={styles.emptyText}>You didn’t report any emergency.</Text>
      ) : (
        <FlatList
          data={emergencies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EmergencyCard
              emergency={item}
              onPress={() =>
                router.navigate({
                  pathname: '/ViewEmergency',
                  params: { emergencyId: item.id },
                })
              }
              onDelete={() => {
                HandleUpdate(item.id);
              }}
              showDeleteButton={activeTab === 'reported-by-you'}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
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
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
});

export default SOS;
