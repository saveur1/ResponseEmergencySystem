import { db } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useS3FileUpload } from "@/hooks/useFileUpload";

interface EmergencyProps {
  type: string;
  location: {
    longitude: number;
    latitude: number;
  };
  description: string;
  timestamp: Date;
  status: string;
  images: string[];
  videos: string[];
  reportedBy: string;
}
interface CreateEmergencyProps {
  type: string;
  location: {
    longitude: number;
    latitude: number;
  };
  description: string;
  timestamp: Date;
  status: string;
  images: string[];
  videos: string[];
  reportedBy: string;
}
export const useCreateEmergency = () => {
  const createEmergency = async (emergency: EmergencyProps) => {
    try {
      const emergencyId = await createEmergencyRecord(emergency);

      return emergencyId;
    } catch (error) {
      console.error("Error creating emergency:", error);
      throw error;
    }
  };

  return { createEmergency };
};

export const createEmergencyRecord = async (
  emergency: CreateEmergencyProps
) => {
  try {
    // Upload images and get URLs

    // Create emergency document with media URLs instead of assets
    const emergencyData = {
      ...emergency,
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

// Function to fetch all emergencies
export const ftetchEmergencies = async (): Promise<EmergencyProps[]> => {
  try {
    const emergencyRef = collection(db, "emergencies");
    const snapshot = await getDocs(emergencyRef);

    const emergencies: EmergencyProps[] = snapshot.docs.map((doc) => ({
      id: doc.id, // Assign document ID
      ...(doc.data() as Omit<EmergencyProps, "id">), // Ensure the data matches EmergencyProps
    }));

    return emergencies;
  } catch (error) {
    console.error("Error fetching emergencies:", error);
    return [];
  }
};
