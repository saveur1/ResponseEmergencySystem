import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Entypo from '@expo/vector-icons/Entypo'

const ReportTypes = () => {

    const [isHidden, setIsHidden] = useState(true);
    const toggleOthers = () => setIsHidden(value => !value);




    return (

        <View className='px-6 pt-4'>
            <Text className='font-bold text-xl mb-2'>Select Emergency Type</Text>
            <View className='border-t p-2'>
                <View className='flex flex-row justify-between my-4'>
                    <TouchableOpacity
                        className='flex flex-col justify-items-center  p-2'
                    >
                        <View className='bg-[#E02323] p-2 rounded-xl'>
                            <FontAwesome5 name="car-crash" size={ 24 } color="white" className='text-center' />
                        </View>
                        <Text className='text-center'>Accident</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <MaterialIcons name="fire-hydrant-alt" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Fire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <FontAwesome6 name="hand-holding-medical" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Medical</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <MaterialIcons name="flood" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Flood</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex flex-row justify-between my-4'>
                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <FontAwesome6 name="house-crack" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Quake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <FontAwesome6 name="people-robbery" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Robbery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                    >
                        <FontAwesome6 name="gun" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Assault</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='flex flex-col justify-items-center p-2'
                        onPress={ toggleOthers }
                    >
                        <Entypo name="dots-three-horizontal" size={ 24 } color="#424B5A" className='text-center' />
                        <Text className='text-center'>Other</Text>
                    </TouchableOpacity>
                </View>

            </View>


            {/* Others */ }
            <TextInput
                id='Others'
                className=' bg-white rounded-xl border focus:border-[#E02323] p-4'
                style={ {
                    display: isHidden ? 'none' : 'block'
                } }
                placeholder='Stuck in elevator'
            />
        </View>

    )
}

export default ReportTypes

const styles = StyleSheet.create({})