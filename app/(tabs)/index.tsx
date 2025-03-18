import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const index = () => {
    return (
        <View style={ styles.container }>
            <View >
                <Text>Hey!</Text>
                <View style={ { display: 'flex', justifyContent: 'space-between', flexDirection: 'row' } }>
                    <Text style={ { fontWeight: 'bold' } } >Constantine </Text>

                    <MaterialCommunityIcons name="bell-ring-outline" size={ 24 } color="black" />
                </View>
            </View>
            <View style={ { flex: 2 } }>
                <Text>Help is just a click away!</Text>
                <Text>Click SOS button to call the help.</Text>

                <TouchableOpacity onPress={ () => router.navigate('./SOS') }
                    style={ { backgroundColor: '#E02323' } }>

                    <Text style={ { color: '#FFFFFF' } }>SOS</Text>
                </TouchableOpacity>
                <Text>Volunteer for help</Text>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20
    }
})