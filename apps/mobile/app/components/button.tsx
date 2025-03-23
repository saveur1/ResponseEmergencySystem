import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: '#E02323', borderRadius: 12 }}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ paddingTop: 6, paddingBottom: 4 }}
          />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 13,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
