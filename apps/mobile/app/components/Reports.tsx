import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface ReportProps {
    report: string;
    setReport: React.Dispatch<React.SetStateAction<string>>;
}
const Reports = ({ report, setReport }: ReportProps) => {
    return (
        <View className='grid m-4 h-full content-end pt-2'>
            <Text className='font-bold font text-xl mb-2 mx-4' >Specify emergency in brief</Text>
            <View className='border-t mx-4'></View>

            <View className='bg-white rounded-xl  p-4 mt-4 h-full'>
                <TextInput
                    value={ report }
                    onChangeText={ (text)=> setReport(text) }
                    placeholder="What is really going on?"
                />
            </View>
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({})