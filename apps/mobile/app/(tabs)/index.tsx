import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const Index = () => {
    const [isVolunter, setIsVolunter] = useState(true);
    const toggleIsVolunter = () => setIsVolunter(value => !value);

    return (
        <View className="flex-1 p-5 justify-between text-[#424B5A]">
            <View >
                <Text className="text-red-600">Hey!</Text>
                <View style={ { display: 'flex', justifyContent: 'space-between', flexDirection: 'row' } }>
                    <Text style={ { fontWeight: 'bold', fontSize: 18 } } >Constantine </Text>

                    <MaterialCommunityIcons name="bell-ring-outline" size={ 24 } color="black" />
                </View>
            </View>
            <View style={ { padding: 20, justifyContent: 'space-between' } }>
                <View>
                    <Text>Help is just a click away!</Text>
                    <Text>Click <Text style={ { color: '#E02323', fontWeight: 'bold' } }>SOS button</Text> to call the help.</Text>
                </View>

                <TouchableOpacity onPress={ () => router.navigate('/ReportEmergency') }
                    style={ styles.sosButton }>

                    <Text style={ styles.SosText }>SOS</Text>
                </TouchableOpacity>
                <View style={ styles.volunter }>
                    <Text style={ { fontWeight: '500', color: '#212121', } }>
                        Volunteer for help
                    </Text>
                    <Switch
                        value={ isVolunter }
                        onValueChange={ toggleIsVolunter }
                        thumbColor={ isVolunter ? '#FFFFFF' : '#E02323' }
                        trackColor={ { true: '#E02323' } }
                    />

                </View>
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        justifyContent: 'space-between',
        height: '100%',
        color: '#424B5A',
    },
    sosButton: {
        alignSelf: 'center',
        marginBottom: 70,
        backgroundColor: '#E02323',
        height: '50%',
        width: '80%',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: ' 0 0 1px 10px #F2A6A6, 0 0 2px 20px #F9D2D2 , 0 0 1px 30px #FAE8E9',
    },
    SosText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 40,
    },
    volunter: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})