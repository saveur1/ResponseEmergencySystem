import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ProofsProps {
  images: ImagePicker.ImagePickerAsset[];
  setImages: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[]>
  >;
  videos: ImagePicker.ImagePickerAsset[];
  setVideos: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[]>
  >;
}

const Proof = ({ images, setImages, setVideos, videos }: ProofsProps) => {
  const [previewItem, setPreviewItem] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

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
  const handlePreview = (
    item: ImagePicker.ImagePickerAsset,
    type: "image" | "video"
  ) => {
    setPreviewItem({ uri: item.uri, type });
    setPreviewModal(true);
  };

  // Function to remove media
  const handleRemove = (id: string, type: "image" | "video" | "audio") => {
    if (type === "image") {
      setImages(images.filter((image) => image.uri !== id));
    } else if (type === "video") {
      setVideos(videos.filter((video) => video.uri !== id));
    } else if (type === "audio") {
      setRecordedAudio(null);
    }
  };

  return (
    <View className="mt-4 py-4 px-6">
      <Text className="font-bold text-xl mb-2">Attach proof</Text>
      <View className="border-t"></View>

      {/* Media Preview Section */}
      <View className="mt-4">
        <Text className="font-medium mb-2">Your proofs</Text>

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
          <View className="flex flex-row gap-2">
            <Entypo
              name="controller-play"
              size={20}
              color="black"
              className="self-center"
            />
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
      <View className="py-2 flex flex-row justify-between">
        <TouchableOpacity
          className="flex flex-col justify-items-center bg-white p-8 rounded-xl"
          onPress={captureImages}
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
          className="flex flex-col justify-items-center bg-white p-8 rounded-xl"
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
          className="flex flex-col justify-items-center bg-white p-8 rounded-xl"
          // Voice recording functionality would go here
        >
          <FontAwesome
            name="microphone"
            size={24}
            color="#E02323"
            className="text-center"
          />
          <Text className="text-center">Voice</Text>
          <Text className="text-center">Recording</Text>
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
