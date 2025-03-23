import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Entypo from '@expo/vector-icons/Entypo'
import EmergencyTypeCard from './EmergencyTypeCard'
interface EmergencyProps {
    emergencyType: string;
    setEmergencyType: React.Dispatch<React.SetStateAction<string>>;
}
const ReportTypes = ({ emergencyType, setEmergencyType}: EmergencyProps) => {

    const [isHidden, setIsHidden] = useState(true);
    const toggleOthers = () => setIsHidden(value => !value);
    
    const emergencyTypes = [
        {icon: <FontAwesome5 name="car-crash" size={ 24 } color="white" className='text-center' />, title: "Accident" },
        {icon: <MaterialIcons name="fire-hydrant-alt" size={ 24 } color="#424B5A" className='text-center' />, title: "Fire" },
        { icon: <FontAwesome6 name="hand-holding-medical" size={ 24 } color="#424B5A" className='text-center' />, title: "Medical" },
        { icon: <MaterialIcons name="flood" size={ 24 } color="#424B5A" className='text-center' />, title: "Flood" },
        { icon: <FontAwesome6 name="house-crack" size={ 24 } color="#424B5A" className='text-center' />, title: "Quake" },
        { icon: <FontAwesome6 name="people-robbery" size={ 24 } color="#424B5A" className='text-center' />, title: "Robbery" },
        { icon: <FontAwesome6 name="gun" size={ 24 } color="#424B5A" className='text-center' />, title: "Assault" },
        { icon: <Entypo name="dots-three-horizontal" size={ 24 } color="#424B5A" className='text-center' />, title: "Other" }
    ];
    
    return (
        <View className='px-6 pt-4'>
            <Text className='font-bold text-xl mb-2'>Select Emergency Type</Text>
            <View className='border-t p-2'>
                <View className='flex flex-row w-full my-4' style={{ flexWrap: "wrap" }}>
                    { emergencyTypes?.map((emergency)=> (
                        <EmergencyTypeCard 
                            key={ emergency.title } 
                            icon={ emergency.icon } 
                            title={emergency.title }
                            emergencyType={ emergencyType }
                            setEmergencyType={ setEmergencyType }
                            />
                    ))}
                </View>

            </View>


            {/* Others */ }
            <TextInput
                id='Others'
                className={`bg-white rounded-xl border focus:border-[#E02323] p-4 ${isHidden ? 'hidden' : 'block'}`}
                placeholder='Stuck in elevator'
            />
        </View>

    )
}

export default ReportTypes

const styles = StyleSheet.create({})