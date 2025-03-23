import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface EmergencyProps {
    icon: ReactNode,
    title: string,
    emergencyType: string;
    setEmergencyType: React.Dispatch<React.SetStateAction<string>>;
}

const EmergencyTypeCard = ({ icon, title, emergencyType, setEmergencyType }: EmergencyProps) => {
    return ( 
        <TouchableOpacity
            className={`flex flex-col justify-center items-center  p-3 w-1/4 rounded-full ${emergencyType==title && "bg-[#E02323]"}`}
            onPress={ () => setEmergencyType(title) }
        >
            <View className="p-2 rounded-md w-12 h-12">
                { icon }
            </View>
            <Text className='text-center'>{ title }</Text>
        </TouchableOpacity>
     );
}
 
export default EmergencyTypeCard;