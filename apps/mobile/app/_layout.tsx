import React from 'react'
import { Stack } from 'expo-router'
import "../assets/global.css";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={ { headerShown: false, } }
      />
      <Stack.Screen
        name='ReportEmergency'
        options={ { title: 'Report Emergency' } }
      />
    </Stack>
  )
}

export default _layout