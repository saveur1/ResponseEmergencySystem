import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ReportTypes from './components/ReportTypes';
import Locations from './components/Locations';
import Proof from './components/Proof';

import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import Reports from './components/Reports';


const ReportEmergency = () => {

    const [isSuccessShown, setIsSuccessShown] = useState(false);

    const toggleSuccess = () => setIsSuccessShown(value => !value);



    return (
        <SafeAreaView className='font-poppins relative h-full'>


            <ScrollView className='font-poppins flex flex-col h-full  content-center mb-32'>
                {/* Emergency Types */ }
                <ReportTypes />


                {/* Location */ }
                <Locations />


                {/* Proof */ }
                <Proof />

                {/* Report */ }
                <Reports />
            </ScrollView>



            {/* Successful Report */ }
            <View className='h-full w-full absolute  px-2  mb-0 pt-2 pb-4 bg-black/30 backdrop-blur-sm'
                style={ {
                    display: isSuccessShown ? 'block' : 'none'
                } }
            >
                <View style={ styles.successful }>

                    <TouchableOpacity
                        onPress={ toggleSuccess }
                    >

                        <EvilIcons name="close" size={ 24 } color={ '#CBD4DC' } className='top-0 right-0 text-right' />
                    </TouchableOpacity>

                    <AntDesign name="checkcircle" size={ 52 } color={ '#00D563' } className='text-center mb-4' />
                    <Text className='text-center font-bold'>Help is on the way</Text>
                    <Text className='text-center'>Read the tips to avoid any</Text>
                    <Text className='text-center'> further risks</Text>

                    <TouchableOpacity
                        className='bg-[#E02323] rounded-xl py-2 px-8 mt-6 mb-2'
                        onPress={ toggleSuccess }
                    >
                        <Text className='font-bold text-white text-xl text-center p-2  w-full'>Read Instructions</Text>
                    </TouchableOpacity>
                </View>
            </View>




            {/* Submit Button */ }
            <View className=' h-fit w-full px-2 pt-2 pb-4 bg-white absolute bottom-0'>
                <TouchableOpacity
                    className='bg-[#E02323] rounded-xl flex flex-row self-end  justify-between p-4 m-4'
                    onPress={ toggleSuccess }
                >
                    <Text className='font-bold text-white text-2xl text-center  w-full'>Submit Report</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

export default ReportEmergency

const styles = StyleSheet.create({
    successful: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '30%',
        left: '23%',
        padding: '20',
        textAlign: 'center',
        borderRadius: 15,
        lineHeight: '150%',
    }
})