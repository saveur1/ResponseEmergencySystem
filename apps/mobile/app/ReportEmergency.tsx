import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReportTypes from "./components/ReportTypes";
import Locations from "./components/Locations";
import Proof from "./components/Proof";

import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Reports from "./components/Reports";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImagePickerAsset } from "expo-image-picker";
import { useCreateEmergency } from "@/actions/emergency";
import { router, useNavigation } from "expo-router";

const ReportEmergency = () => {
    const [isSuccessShown, setIsSuccessShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("Fire");
    const [report, setReport] = useState("");
    const [location, setLocation] = useState({
        longitude: 0,
        latitude: 0,
    });
    const [images, setImages] = useState<ImagePickerAsset[]>([]);
    const [videos, setVideos] = useState<ImagePickerAsset[]>([]);
    const [imagesUrls, setImagesUrls] = useState<string[]>([]);
    const [videosUrls, setVideosUrls] = useState<string[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const navigation = useNavigation();

    const resetForm = () => {
        setType("Fire");
        setReport("");
        setLocation({ longitude: 0, latitude: 0 });
        setImages([]);
        setVideos([]);
    };
    const { createEmergency } = useCreateEmergency();

    const toggleSuccess = async () => {
        setIsLoading(true);
        const data = {
            type: type,
            location,
            description: report,
            timestamp: new Date(),
            status: "pending",
            images: imagesUrls,
            videos: videosUrls,
            audio: audioUrl,
        };
        await createEmergency(data);
        setIsLoading(false);
        setIsSuccessShown(true);
        resetForm();
        navigateToSOS();
    };

    useEffect(()=> {
        navigation.setOptions({
            title: "Report Emergency"
        });
    }, [])

    const navigateToSOS = () => {
        setIsSuccessShown(false);
        router.navigate("/SOS"); // Replace "SOS" with the actual route name for the SOS screen
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="font-poppins relative h-full">
                <ScrollView className="font-poppins flex flex-col h-full  content-center mb-32">
                    {/* Emergency Types */}
                    <ReportTypes
                        onSelected={(value) => { setType(value) }}
                        selectedEmergency={ type }
                    />

                    {/* Location */}
                    <Locations location={location} setLocation={ setLocation } />

                    {/* Proof */}
                    <Proof
                        images={ images }
                        videos={ videos }
                        setImages={ setImages }
                        setVideos={ setVideos }
                        setImagesUrls={ setImagesUrls }
                        setVideosUrls={ setVideosUrls }
                        setAudioUrl = { setAudioUrl }
                    />

                    {/* Report */}
                    <Reports report={report} setReport={setReport} />
                </ScrollView>

                {/* Loading Screen */}
                { isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#E02323" />
                    </View>
                )}

                {/* Successful Report */}
                <View
                    className="h-full w-full absolute  px-2  mb-0 pt-2 pb-4 bg-black/30 backdrop-blur-sm"
                    style={{
                        display: isSuccessShown ? "flex" : "none",
                    }}
                >
                    <View style={styles.successful}>
                        <TouchableOpacity onPress={() => setIsSuccessShown(false)}>
                            <EvilIcons
                                name="close"
                                size={24}
                                color={"#CBD4DC"}
                                className="top-0 right-0 text-right"
                            />
                        </TouchableOpacity>

                        <AntDesign
                            name="checkcircle"
                            size={52}
                            color={"#00D563"}
                            className="text-center mb-4"
                        />
                        <Text className="text-center font-bold">Help is on the way</Text>
                        <Text className="text-center">Read the tips to avoid any</Text>
                        <Text className="text-center"> further risks</Text>

                        <TouchableOpacity
                            className="bg-[#E02323] rounded-xl py-2 px-8 mt-6 mb-2"
                            onPress={navigateToSOS}
                            >
                            <Text className="font-bold text-white text-xl text-center p-2  w-full">Read Instructions</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Submit Button */}
                <View className=" h-fit w-full px-2 pt-2 pb-4 bg-white absolute bottom-0">
                    <TouchableOpacity
                        className="bg-[#E02323] rounded-xl flex flex-row self-end  justify-between p-4 m-4"
                        onPress={toggleSuccess}
                    >
                        <Text className="font-bold text-white text-2xl text-center  w-full">Submit Report</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ReportEmergency;

const styles = StyleSheet.create({
  successful: {
    backgroundColor: "white",
    position: "absolute",
    top: "30%",
    left: "23%",
    padding: 20,
    textAlign: "center",
    borderRadius: 15,
    lineHeight: 24,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
