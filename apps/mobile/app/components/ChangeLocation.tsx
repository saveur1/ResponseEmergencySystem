import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { router } from 'expo-router';

const ChangeLocation = () => {
    return (
        <SafeAreaView className=' absolute h-full w-full  bg-black/30 backdrop-blur-sm z-99'>
            <View className='bg-white h-fit flex flex-col p-4 mt-40'>

                <View className=' m-2 p-2'>
                    <TouchableOpacity
                        className='flex flex-row gap-2 content-center'
                    >
                        <AntDesign name="arrowleft" size={ 20 } color="grey" />
                        <Text className='font-bold'>Select Location</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex flex-row bg-white items-center border rounded-xl border-grey/20'>
                    <EvilIcons name="search" size={ 20 } color="grey" className='p-2' />
                    <TextInput
                        placeholder="Search Address"
                    />
                </View>

                <View className='h-64 my-4 rounded-xl'>
                    <MapView style={ styles.map } provider={ PROVIDER_GOOGLE } style={ styles.map } />
                </View>

                <TextInput
                    className='flex flex-row bg-white items-center border rounded-xl border-grey/20  focus:border-[#E02323] p-2 my-2'
                    placeholder="Province/state"
                />
                <TextInput
                    className='flex flex-row bg-white items-center border rounded-xl border-grey/20  focus:border-[#E02323] p-2 my-2'
                    placeholder="city"
                />
                <TextInput
                    className='flex flex-row bg-white items-center border rounded-xl border-grey/20  focus:border-[#E02323] p-2 my-2'
                    placeholder="location"
                />


                <View className='p-4 m-4 '>
                    <TouchableOpacity
                        className='bg-[#E02323] rounded-xl flex flex-row w-full flex justify-between p-4 m-4'
                        onPress={ () => router.navigate('/ReportEmergency') }
                    >
                        <Text className='text-center w-full text-white'>Confirm Location</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ChangeLocation

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    }
})