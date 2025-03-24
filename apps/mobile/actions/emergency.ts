import { ImagePickerAsset } from "expo-image-picker";
import { db, storage } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

interface EmergencyProps {
  type: string;
  location: {
    longitude: number;
    latitude: number;
  };
  description: string;
  timestamp: Date;
  status: string;
  images: ImagePickerAsset[];
  videos: ImagePickerAsset[];
}

export const createEmergencyRecord = async (emergency: EmergencyProps) => {
  try {
    // Upload images and get URLs
    const imageUrls = await Promise.all(
      emergency.images.map(async (image) => {
        return await uploadMedia(image, "public");
      })
    );

    // Upload videos and get URLs
    const videoUrls = await Promise.all(
      emergency.videos.map(async (video) => {
        return await uploadMedia(video, "public");
      })
    );

    // Create emergency document with media URLs instead of assets
    const emergencyData = {
      ...emergency,
      images: imageUrls,
      videos: videoUrls,
      timestamp: Date.now(),
    };

    const emergencyRef = collection(db, "emergencies");
    const newEmergency = await addDoc(emergencyRef, emergencyData);
    console.log("Emergency created with ID:", newEmergency.id);

    return newEmergency.id;
  } catch (error) {
    console.error("Error creating emergency:", error);
    throw error;
  }
};

// Helper function to upload media files to Cloudinary
async function uploadMedia(
  media: ImagePickerAsset,
  folder: string
): Promise<string> {
  try {
    // Cloudinary unsigned upload preset (you need to create this in your Cloudinary dashboard)
    const CLOUDINARY_UPLOAD_PRESET = "public";
    const CLOUDINARY_CLOUD_NAME = "ddydbygzs";

    // Create form data for the upload
    const formData = new FormData();

    // Get file extension
    const fileExt = media.uri.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

    // Convert to blob and append to form data
    const type = media.mimeType || `image/${fileExt}`;

    formData.append(
      "file",
      new Blob([media.uri], { type }),
      `${filename}.${fileExt}`
    );
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folder);

    // Upload to Cloudinary using unsigned upload
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadResult = await uploadResponse.json();

    if (uploadResponse.ok) {
      return uploadResult.secure_url;
    } else {
      throw new Error(
        uploadResult.error?.message || "Failed to upload to Cloudinary"
      );
    }
  } catch (error) {
    console.error(`Error uploading ${folder}:`, error);
    throw error;
  }
}
