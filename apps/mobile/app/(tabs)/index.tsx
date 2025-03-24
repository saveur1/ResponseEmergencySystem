import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const Index = () => {
  const [isVolunter, setIsVolunter] = useState(true);
  const toggleIsVolunter = () => setIsVolunter((value) => !value);

  return (
    <ScrollView className="flex-1 p-5 text-[#424B5A] relative">
      <View>
        <Text>Hey!</Text>
        <View className="flex justify-between flex-row mt-1">
          <Text className="font-bold text-xl">Is everything Alright? </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-8">
        <View className="pb-14">
          <Text>Help is just a click away!</Text>
          <Text>
            Click{' '}
            <Text style={{ color: '#E02323', fontWeight: 'bold' }}>
              SOS button
            </Text>{' '}
            to call the help.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.navigate('/ReportEmergency')}
          style={styles.sosButton}
        >
          <Text className="text-white font-bold text-4xl">SOS</Text>
        </TouchableOpacity>

        <View className="bg-white w-full rounded-md flex flex-row items-center justify-between px-4 mb-10">
          <Text style={{ fontWeight: '500', color: '#212121' }}>
            Volunteer for help
          </Text>
          <Switch
            value={isVolunter}
            onValueChange={toggleIsVolunter}
            thumbColor={isVolunter ? '#FFFFFF' : '#E02323'}
            trackColor={{ true: '#E02323' }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  sosButton: {
    alignSelf: 'center',
    marginBottom: 70,
    backgroundColor: '#E02323',
    height: 250,
    width: 250,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow:
      ' 0 0 1px 10px #F2A6A6, 0 0 2px 20px #F9D2D2 , 0 0 1px 30px #FAE8E9',
  },
});
