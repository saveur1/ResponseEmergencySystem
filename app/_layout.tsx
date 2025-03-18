import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={ { headerShown: false, } }
      />
    </Stack>
    // <slot/>
  )
}

export default _layout