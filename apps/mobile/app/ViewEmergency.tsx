import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

import EmergencyIcon from './components/EmergencyIcon';
import LocationBadge from './components/LocationBadge';
import { db } from '@/utils/firebase';
import type { Emergency } from '../types';

type RouteParams = {
  emergencyId: string;
};

const ViewEmergencyScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const navigation = useNavigation();
  const { emergencyId } = route.params;

  const [emergency, setEmergency] = useState<Emergency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        const docRef = doc(db, 'emergencies', emergencyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setEmergency({
            id: docSnap.id,
            type: data.type,
            location:
              data.location?.address ||
              `${data.location?.latitude}, ${data.location?.longitude}`,
            description: data.description,
            timestamp: data.timestamp,
            status: data.status,
            images: data.images || [],
            reportedBy: data.reportedBy,
          });
        }
      } catch (error) {
        console.error('Error fetching emergency:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergency();
  }, [emergencyId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!emergency) {
    return (
      <View style={styles.loader}>
        <Text>Emergency not found.</Text>
      </View>
    );
  }

  const emergencyTips = [
    'Stay Calm & Check for injuries - Assess yourself and passengers for injuries.',
    'Move to Safety (if Possible) - If the vehicle is drivable, move it to the side of the road. If not, turn on hazard lights.',
    'Call Emergency Services - Dial 112 for medical and police assistance.',
    'Do Not Leave the Scene - Stay until authorities arrive unless medical attention is needed.',
    'Exchange Information - Share contact and insurance details with other involved parties.',
  ];

  const locationValue =
    typeof emergency.location === 'string'
      ? emergency.location
      : emergency.location
      ? `${emergency.location.latitude.toFixed(
          4
        )}, ${emergency.location.longitude.toFixed(4)}`
      : 'Unknown location';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <MaterialIcons name="emergency" size={40} color="#FF3B30" />
      </View>

      <LocationBadge location={locationValue} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{emergency.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Images/Videos</Text>
        <View style={styles.imagesContainer}>
          {emergency.images?.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.thumbnail} />
          ))}
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <View style={styles.tipsHeader}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#FF3B30"
          />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
    marginTop: 16,
  },
  iconContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 8,
  },
  tipsContainer: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    marginVertical: 16,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 4,
  },
  tipsSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#000000',
  },
  tipItem: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  tipNumber: {
    width: 16,
    fontWeight: '500',
    color: '#333333',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
});

export default ViewEmergencyScreen;
