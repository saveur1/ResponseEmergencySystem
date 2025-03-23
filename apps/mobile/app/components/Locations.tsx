import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
interface LocationProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}
const Locations = ({ location, setLocation }: LocationProps) => {
    const [showChange, setShowChange] = useState(false);
    return (
        <View className='mt-4 py-4 px-6'>
            <Text className='font-bold text-xl mb-2'>Location</Text>
            <View className='border-t '></View>
            <View >
                <View className=' bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-4 mb-4'>
                { showChange 
                ? <TextInput
                        value={ location }
                        onChangeText={ (text)=> setLocation(text) }
                        className="flex items-center"
                        placeholder="Enter Location"
                    />
                : 
                    <Text style={ { fontWeight: '500', color: '#212121', } }>
                        <EvilIcons name="location" size={ 20 } color="black" />
                        { location || "Enter Location!" }
                    </Text>
                }
                <TouchableOpacity
                    onPress={ () => setShowChange((prev) => !prev) }
                >
                    <Text className='text-[#E02323] font-bold'>{ showChange ? <MaterialIcons name="multiple-stop" size={ 20 } color="red" /> : "Change"}</Text>
                </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Locations

const styles = StyleSheet.create({})