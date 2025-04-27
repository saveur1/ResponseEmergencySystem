import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video, Audio } from "expo-av";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export type ProofStatus = "none" | "selected" | "uploading" | "uploaded";

interface ProofsProps {
  images: ImagePicker.ImagePickerAsset[];
  setImages: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  videos: ImagePicker.ImagePickerAsset[];
  setVideos: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  setImagesUrls: Dispatch<SetStateAction<string[]>>;
  setVideosUrls: Dispatch<SetStateAction<string[]>>;
  setAudioUrl: Dispatch<SetStateAction<string | null>>;
  proofStatus: ProofStatus;
  setProofStatus: Dispatch<SetStateAction<ProofStatus>>;
}

const Proof = ({
  images,
  setImages,
  setVideos,
  videos,
  setImagesUrls,
  setVideosUrls,
  setAudioUrl,
  proofStatus,
  setProofStatus,
}: ProofsProps) => {
  const [previewItem, setPreviewItem] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<string>();
  const [previewModal, setPreviewModal] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if proof components are disabled
  const isDisabled = proofStatus === "uploading" || proofStatus === "uploaded";

  // Function to capture images
  const captureImages = async () => {
    if (isDisabled) return;

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
      setProofStatus("selected");
    }
  };

  const recordAudio = async () => {
    if (isDisabled) return;

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

        if (uri) {
          setRecordedAudio(uri);
          setProofStatus("selected");
        }
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

  const uploadToCloudinary = async (
    uri: string,
    type: "image" | "video" | "raw"
  ) => {
    const data = new FormData();
    const fileType =
      type === "image" ? "jpg" : type === "video" ? "mp4" : "mp3";
    const fileName = `upload.${fileType}`;

    data.append("file", {
      uri,
      type: `${type}/${fileType}`,
      name: fileName,
    } as any);
    data.append(
      "upload_preset",
      process.env.EXPO_PUBLIC_CLOUDINARY_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/${type}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

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
    if (isDisabled) return;

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
      setProofStatus("selected");
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

  const handleUploadAssets = async () => {
    if (images.length === 0 && videos.length === 0 && !recordedAudio) {
      alert("Please select at least one image, video, or audio to upload");
      return;
    }

    setProofStatus("uploading");
  };

  // Use effect to handle uploads when status changes to "uploading"
  useEffect(() => {
    const uploadAssets = async () => {
      if (proofStatus !== "uploading") return;

      setIsAssetsLoading(true);

      try {
        // Upload images and videos to Cloudinary
        for (const image of images) {
          const url = await uploadToCloudinary(image.uri, "image");
          setImagesUrls((prev) => [...prev, url]);
        }

        for (const video of videos) {
          const url = await uploadToCloudinary(video.uri, "video");
          setVideosUrls((prev) => [...prev, url]);
        }

        if (recordedAudio) {
          const url = await uploadToCloudinary(recordedAudio, "raw");
          setAudioUrl(url);
        }

        setProofStatus("uploaded");
        alert("Assets uploaded successfully");
        Alert.alert(
          "Assets uploaded successfully",
          "Your proofs have been uploaded successfully.",
          [
            {
              text: "OK",
            },
          ]
        );
      } catch (error) {
        console.log("Error uploading assets:", error);
        setProofStatus("selected");
      } finally {
        setIsAssetsLoading(false);
      }
    };

    uploadAssets();
  }, [proofStatus]);

  // Function to remove media
  const handleRemove = (id: string, type: "image" | "video" | "audio") => {
    if (isDisabled) return;

    if (type === "image") {
      setImages(images.filter((image) => image.uri !== id));
    } else if (type === "video") {
      setVideos(videos.filter((video) => video.uri !== id));
    } else if (type === "audio") {
      setRecordedAudio(undefined);
    }

    // Update status if we still have media
    if (
      (type === "image" &&
        (images.length > 1 || videos.length > 0 || recordedAudio)) ||
      (type === "video" &&
        (videos.length > 1 || images.length > 0 || recordedAudio)) ||
      (type === "audio" && (images.length > 0 || videos.length > 0))
    ) {
      setProofStatus("selected");
    } else {
      setProofStatus("none");
    }
  };

  return (
    <View className="mt-4 py-4 px-6">
      <Text className="font-bold text-xl text-gray-600 mb-2">
        Attach proof{" "}
        {isDisabled &&
          (proofStatus === "uploaded" ? "(Uploaded)" : "(Uploading...)")}
      </Text>
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
                <TouchableOpacity
                  onPress={() => handlePreview(image, "image")}
                  disabled={isDisabled}
                >
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      opacity: isDisabled ? 0.7 : 1,
                    }}
                  />
                </TouchableOpacity>
                {!isDisabled && (
                  <TouchableOpacity
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                    onPress={() => handleRemove(image.uri, "image")}
                  >
                    <Entypo name="cross" size={16} color="white" />
                  </TouchableOpacity>
                )}
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
                <TouchableOpacity
                  onPress={() => handlePreview(video, "video")}
                  disabled={isDisabled}
                >
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: isDisabled ? 0.7 : 1,
                    }}
                  >
                    <Ionicons name="videocam" size={32} color="#E02323" />
                    <Text className="text-xs mt-1">Video {index + 1}</Text>
                  </View>
                </TouchableOpacity>
                {!isDisabled && (
                  <TouchableOpacity
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                    onPress={() => handleRemove(video.uri, "video")}
                  >
                    <Entypo name="cross" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        {/* Default Images */}
        {images.length === 0 && videos.length === 0 && !recordedAudio && (
          <View>
            <Text className="mb-2 text-gray-500">Please add proof</Text>
          </View>
        )}
      </View>

      {/* Recorded audio */}
      {recordedAudio && (
        <View
          className={`bg-white rounded-xl flex flex-row items-center justify-between p-4 mt-2 mb-4 ${
            isDisabled ? "opacity-70" : ""
          }`}
        >
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={playRecordedAudio} disabled={isDisabled}>
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
          {!isDisabled && (
            <TouchableOpacity onPress={() => handleRemove("audio", "audio")}>
              <Text className="text-[#E02323] font-bold">remove</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View className="py-2 flex flex-row gap-x-2 justify-between pr-2">
        <TouchableOpacity
          className={`flex flex-col justify-items-center bg-white p-6 rounded-xl ${
            isDisabled ? "opacity-50" : ""
          }`}
          onPress={captureImages}
          disabled={isDisabled}
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
          className={`flex flex-col justify-items-center bg-white p-6 rounded-xl ${
            isDisabled ? "opacity-50" : ""
          }`}
          onPress={recordVideo}
          disabled={isDisabled}
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
          className={`flex flex-col justify-items-center bg-white p-6 rounded-xl ${
            isDisabled ? "opacity-50" : ""
          }`}
          onPress={recordAudio}
          disabled={isDisabled}
        >
          <FontAwesome
            name="microphone"
            size={24}
            color="#E02323"
            className="text-center"
          />
          <Text className="text-center">{recording ? "Stop" : "Voice"}</Text>
          <Text className="text-center">
            {recording ? "Recording" : "Recording"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* UPLOAD ATTACHMENTS */}
      {proofStatus !== "uploaded" && (
        <View className="mt-4 w-1/2">
          <TouchableOpacity
            className={`bg-red-500 py-3 px-6 rounded-md w-auto ${
              isDisabled ? "opacity-70" : ""
            }`}
            onPress={handleUploadAssets}
            disabled={isDisabled || proofStatus === "none"}
          >
            <Text className="text-white text-center font-bold">
              {proofStatus === "uploading" ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Upload Proofs"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
