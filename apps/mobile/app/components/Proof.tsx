import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ProofOne from '@/assets/images/ProofOne.png';
import ProofTwo from '@/assets/images/ProofTwo.png';
import ProofThree from '@/assets/images/ProofThree.png';


const Proof = () => {
    return (
        <View className='mt-4 py-4 px-6'>
            <Text className='font-bold text-xl mb-2'>Attach proof</Text>
            <View className='border-t '></View>
            {/* Proof Images */ }
            <View className='flex flex-row justify-normal gap-4 mt-4'>
                <Image source={ ProofOne } alt='first Proof' />
                <Image source={ ProofTwo } alt='second Proof' />
                <Image source={ ProofThree } alt='Third Proof' />
            </View>

            {/* Recorded audio */ }
            <View className=' bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-4 mb-4'>

                <View className='flex flex-row gap-2'>
                    <Entypo name="controller-play" size={ 20 } color="black" className='self-center' />
                    <Text style={ { fontWeight: '500', color: '#212121', } } >
                        recorded audio
                    </Text>
                </View>
                <TouchableOpacity
                // onPress={ }
                >
                    <Text className='text-[#E02323] font-bold'>remove</Text>
                </TouchableOpacity>

            </View>




            <View className='py-2 flex flex-row justify-between'>
                <TouchableOpacity
                    className='flex flex-col justify-items-center bg-white p-8 rounded-xl'
                // onPress={}
                >
                    <Entypo name="camera" size={ 24 } color="#E02323" className='text-center' />
                    <Text className='text-center'>Click</Text>
                    <Text className='text-center'>Pictures</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='flex flex-col justify-items-center bg-white p-8 rounded-xl'
                // onPress={}
                >
                    <Ionicons name="videocam" size={ 24 } color="#E02323" className='text-center' />
                    <Text className='text-center'>Video</Text>
                    <Text className='text-center'>Recording</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='flex flex-col justify-items-center bg-white p-8 rounded-xl'
                // onPress={}
                >
                    <FontAwesome name="microphone" size={ 24 } color="#E02323" className='text-center' />
                    <Text className='text-center'>Voice</Text>
                    <Text className='text-center'>Recording</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Proof

const styles = StyleSheet.create({})