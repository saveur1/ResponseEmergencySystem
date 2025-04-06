import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video, Audio } from "expo-av";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";


interface ProofsProps {
    images: ImagePicker.ImagePickerAsset[];
    setImages: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
    videos: ImagePicker.ImagePickerAsset[];
    setVideos: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
    setImagesUrls: Dispatch<SetStateAction<string[]>>;
    setVideosUrls: Dispatch<SetStateAction<string[]>>;
    setAudioUrl: Dispatch<SetStateAction<string | null>>;
}

const Proof = ({ images, setImages, setVideos, videos, setImagesUrls, setVideosUrls, setAudioUrl }: ProofsProps) => {
    const [previewItem, setPreviewItem] = useState<{ uri: string; type: "image" | "video" } | null>(null);
    const [recordedAudio, setRecordedAudio] = useState<string>();
    const [previewModal, setPreviewModal] = useState(false);
    const [isAssetsLoading, setIsAssetsLoading] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);



    // Function to capture images
    const captureImages = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to allow camera access to take pictures");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setImages([...images, ...result.assets]);
        }
    };

    const recordAudio = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (!permission.granted) {
                alert("Permission to access microphone is required!");
                return;
            }
        
            if (recording) {
                // Stop recording
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecording(null);
        
                if (uri)
                    setRecordedAudio(uri);

            } else {
                // Start recording
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
        
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
        
                setRecording(recording);
            }
        } catch (error) {
            console.error("Failed to record audio:", error);
        }
    }; 
    
    const playRecordedAudio = async () => {
        if (!recordedAudio) return;
      
        try {
          if (isPlaying && soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
            setIsPlaying(false);
            return;
          }
      
          const { sound } = await Audio.Sound.createAsync({ uri: recordedAudio });
          soundRef.current = sound;
          setIsPlaying(true);
      
          sound.setOnPlaybackStatusUpdate((status) => {
            if ((status as any).didJustFinish) {
              setIsPlaying(false);
            }
          });
      
          await sound.playAsync();
        } catch (error) {
          console.error("Playback error:", error);
        }
    };
      

    const uploadToCloudinary = async (uri: string, type: "image" | "video" | "raw") => {
        const data = new FormData();
        const fileType = type === "image" ? "jpg" : type === "video" ? "mp4" : "mp3";
        const fileName = `upload.${fileType}`;
        
        data.append("file", {
            uri,
            type: `${type}/${fileType}`,
            name: fileName,
        } as any);
        data.append("upload_preset", process.env.EXPO_PUBLIC_CLOUDINARY_PRESET || "");
    
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/${type}/upload`, {
                method: "POST",
                body: data,
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error?.message || "Upload failed");
            }
            return result.secure_url;
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    };
    

    // Function to record video
    const recordVideo = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to allow camera access to record videos");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            videoMaxDuration: 60,
        });

        if (!result.canceled) {
            setVideos([...videos, result.assets[0]]);
        }
    };

    // Function to preview media
    const handlePreview = (item: ImagePicker.ImagePickerAsset, type: "image" | "video") => {
        setPreviewItem({ uri: item.uri, type });
        setPreviewModal(true);
    };

    const handleUploadAssets = async() => {
        
        if (images.length === 0 && videos.length === 0) {
            alert("Please select at least one image or video to upload");
            return;
        }
        setIsAssetsLoading(true);
        // Upload images and videos to Cloudinary
        try {
            for(const image of images) {
                const url = await uploadToCloudinary(image.uri, "image");
                setImagesUrls((prev) => [...prev, url]);
            }
            for(const video of videos) {
                const url = await uploadToCloudinary(video.uri, "video");
                setVideosUrls((prev) => [...prev, url]);
            }

            if (recordedAudio) {
                const url = await uploadToCloudinary(recordedAudio, "raw");
                setAudioUrl(url);
            }
            alert("Assets uploaded successfully");
        } catch (error) {
            console.log("Error uploading assets:", error);
        } finally {
            setIsAssetsLoading(false);
        }

    }

    // Function to remove media
    const handleRemove = (id: string, type: "image" | "video" | "audio") => {
        if (type === "image") {
            setImages(images.filter((image) => image.uri !== id));
        } else if (type === "video") {
            setVideos(videos.filter((video) => video.uri !== id));
        } else if (type === "audio") {
            setRecordedAudio(undefined);
        }
    };

  return (
    <View className="mt-4 py-4 px-6">
      <Text className="font-bold text-xl text-gray-600 mb-2">Attach proof</Text>
      <View className="border-t border-black/20"></View>

      {/* Media Preview Section */}
      <View className="mt-4">
        <Text className="text-gray-500 mb-2">Your proofs</Text>

        {/* Images Preview */}
        {images.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {images.map((image, index) => (
              <View key={index} className="mr-3 relative">
                <TouchableOpacity onPress={() => handlePreview(image, "image")}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  onPress={() => handleRemove(image.uri, "image")}
                >
                  <Entypo name="cross" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Videos Preview */}
        {videos.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {videos.map((video, index) => (
              <View key={index} className="mr-3 relative">
                <TouchableOpacity onPress={() => handlePreview(video, "video")}>
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="videocam" size={32} color="#E02323" />
                    <Text className="text-xs mt-1">Video {index + 1}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  onPress={() => handleRemove(video.uri, "video")}
                >
                  <Entypo name="cross" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Default Images */}
        {images.length === 0 && videos.length === 0 && (
          <View>
            <Text className="mb-2 text-gray-500">Please add proof</Text>
          </View>
        )}
      </View>

      {/* Recorded audio */}
      {recordedAudio && (
        <View className="bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-2 mb-4">
            <View className="flex flex-row items-center gap-2">
                <TouchableOpacity onPress={playRecordedAudio}>
                    <Entypo
                        name={isPlaying ? "controller-stop" : "controller-play"}
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={{ fontWeight: "500", color: "#212121" }}>
                    recorded audio
                </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove("audio", "audio")}>
                <Text className="text-[#E02323] font-bold">remove</Text>
            </TouchableOpacity>
        </View>
        )}


      {/* Action Buttons */}
      <View className="py-2 flex flex-row gap-x-2 justify-between pr-2">
        <TouchableOpacity
          className="flex flex-col justify-items-center bg-white p-6 rounded-xl"
          onPress={ captureImages }
        >
            <Entypo
                name="camera"
                size={24}
                color="#E02323"
                className="text-center"
            />
            <Text className="text-center">Click</Text>
            <Text className="text-center">Pictures</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-col justify-items-center bg-white p-6 rounded-xl"
          onPress={recordVideo}
        >
          <Ionicons
            name="videocam"
            size={24}
            color="#E02323"
            className="text-center"
          />
          <Text className="text-center">Video</Text>
          <Text className="text-center">Recording</Text>
        </TouchableOpacity>

        <TouchableOpacity
        className="flex flex-col justify-items-center bg-white p-6 rounded-xl"
        onPress={recordAudio}
        >
            <FontAwesome name="microphone" size={24} color="#E02323" className="text-center" />
            <Text className="text-center">
                {recording ? "Stop" : "Voice"}
            </Text>
            <Text className="text-center">
                {recording ? "Recording" : "Recording"}
            </Text>
        </TouchableOpacity>
      </View>

      {/* UPLOAD ATTACHMENTS */}
    <View className="mt-4 w-1/2">
        <TouchableOpacity
            className="bg-red-500 py-3 px-6 rounded-md w-auto"
            onPress={ handleUploadAssets }
        >
            <Text className="text-white text-center font-bold">
               { isAssetsLoading ? <ActivityIndicator size="small" color="white"/>: "Upload Proofs"}
            </Text>
        </TouchableOpacity>
    </View>

      {/* Preview Modal */}
      <Modal visible={previewModal} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            className="absolute top-10 right-5 z-10"
            onPress={() => setPreviewModal(false)}
          >
            <Entypo name="circle-with-cross" size={36} color="white" />
          </TouchableOpacity>

          {previewItem && previewItem.type === "image" ? (
            <Image
              source={{ uri: previewItem.uri }}
              style={{ width: "90%", height: "60%", resizeMode: "contain" }}
            />
          ) : previewItem && previewItem.type === "video" ? (
            <Video
              source={{ uri: previewItem.uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              useNativeControls
              style={{ width: "90%", height: "60%" }}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default Proof;

const styles = StyleSheet.create({});
