import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface EmergencyProps {
    icon: ReactNode,
    title: string
}

const EmergencyTypeCard = ({ icon, title }: EmergencyProps) => {
    return ( 
        <TouchableOpacity
            className={`flex flex-col justify-center items-center  p-3 w-1/4 rounded-full ${title=="Accident" && "bg-[#E02323]"}`}
        >
            <View className="p-2 rounded-md w-12 h-12">
                { icon }
            </View>
            <Text className='text-center'>{ title }</Text>
        </TouchableOpacity>
     );
}
 
export default EmergencyTypeCard;