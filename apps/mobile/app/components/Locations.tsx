import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { router } from 'expo-router'

const Locations = () => {
    return (
        <View className='mt-4 py-4 px-6'>
            <Text className='font-bold text-xl mb-2'>Location</Text>
            <View className='border-t '></View>
            <View >
                <View className=' bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-4 mb-4'>
                    <Text style={ { fontWeight: '500', color: '#212121', } }>
                        <EvilIcons name="location" size={ 20 } color="black" />
                        Nyamirambo, Kigali, KN 345
                    </Text>
                    <TouchableOpacity
                        onPress={ () => router.navigate('/ReportEmergencyLocation') }
                    >
                        <Text className='text-[#E02323] font-bold'>Change</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}

export default Locations

const styles = StyleSheet.create({})