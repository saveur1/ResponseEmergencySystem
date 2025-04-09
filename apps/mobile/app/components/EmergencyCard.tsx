import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationBadge from './LocationBadge';
import type { Emergency } from '../../types';
import EmergencyIcon from './EmergencyIcon';

type EmergencyCardProps = {
  emergency: Emergency;
  onDelete?: () => void;
  onPress?: () => void;
  showDeleteButton: boolean;
};

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  emergency,
  onDelete,
  onPress,
  showDeleteButton,
}) => {
  // Format the location data for the LocationBadge
  const locationValue =
    typeof emergency.location === 'string'
      ? emergency.location
      : emergency.location
      ? `${emergency.location.latitude.toFixed(
          4
        )}, ${emergency.location.longitude.toFixed(4)}`
      : 'Unknown location';

  // Format the timestamp
  const formattedTime = emergency.timestamp
    ? new Date(emergency.timestamp).toLocaleString()
    : 'Unknown time';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <LocationBadge location={locationValue} />
        <Text
          style={[
            styles.status,
            emergency.status === 'cancelled' && styles.cancelled,
          ]}
        >
          {emergency.status || 'Unknown'}
        </Text>

        {onDelete && showDeleteButton && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <EmergencyIcon type={emergency.type} size={40} />

        <View style={styles.details}>
          <Text style={styles.type}>{emergency.type}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {emergency.description}
          </Text>
          <Text style={styles.timestamp}>{formattedTime}</Text>
        </View>
      </View>

      {((emergency.images?.length ?? 0) > 0 ||
        (emergency.videos?.length ?? 0) > 0) && (
        <View style={styles.mediaIndicator}>
          <Text style={styles.mediaText}>
            {emergency.images?.length
              ? `${emergency.images.length} images`
              : ''}
            {emergency.images?.length && emergency.videos?.length ? ' • ' : ''}
            {emergency.videos?.length
              ? `${emergency.videos.length} videos`
              : ''}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A90E2',
    paddingHorizontal: 8,
  },
  deleteButton: {
    padding: 4,
  },
  content: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  type: {
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
  timestamp: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  mediaIndicator: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  mediaText: {
    fontSize: 12,
    color: '#666666',
  },
  cancelled: {
    color: 'red',
  },
});

export default EmergencyCard;
