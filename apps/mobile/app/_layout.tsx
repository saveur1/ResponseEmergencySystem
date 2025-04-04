import React from "react";
import { Stack } from "expo-router";
import "../assets/global.css";
import { AuthProvider } from "../Context/context";

const _layout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Auth/login"
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <Stack.Screen name="Auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       
        
        <Stack.Screen name="ViewEmergency" options={{ headerShown: false }} />
        <Stack.Screen
          name="NotificationsScreen"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default _layout;
