import React from 'react';
import { Stack } from 'expo-router';
import '../assets/global.css';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="Auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="ReportEmergency"
        options={{ title: 'Report Emergency' }}
      />
      <Stack.Screen name="EmergenciesScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ViewEmergency" options={{ headerShown: false }} />
      <Stack.Screen name="NotificationsScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
