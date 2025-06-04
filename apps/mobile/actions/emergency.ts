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
  assignedTo?: string;
  audio?: string; // Optional audio field
  priority?: string; // Optional priority field
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
  assignedTo?: string;
}
export const useCreateEmergency = () => {
  const createEmergency = async (emergency: EmergencyProps) => {
    try {
      // Fetch users with the role "reporter"
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const responders = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "responder");

      // If reporters are found, assign the fullName of the first reporter
      if (responders.length > 0) {
        // Fetch all existing emergencies to determine current load
        const allEmergencies = await ftetchEmergencies();

        // Initialize emergency counts for each reporter
        const respondersEmergencyCounts: Record<string, number> = {};
        responders.forEach((responder) => {
          // Assuming reporter objects have a 'fullname' property used for assignment
          if (responder.fullName) {
            respondersEmergencyCounts[responder.fullName] = 0;
          }
        });

        // Count emergencies currently assigned to each reporter
        allEmergencies.forEach((em) => {
          if (em.assignedTo) {
            respondersEmergencyCounts[em.assignedTo]++;
          }
        });
        console.warn("Keys:", Object.keys(respondersEmergencyCounts));
        const responderWithLowEmergencyCount = Object.keys(
          respondersEmergencyCounts
        ).reduce(
          (a, b) =>
            respondersEmergencyCounts[a] < respondersEmergencyCounts[b] ? a : b,
          responders[0].fullName
        );
        console.warn(
          "Responder with lowest emergency count:",
          responderWithLowEmergencyCount
        );

        emergency.assignedTo =
          responderWithLowEmergencyCount ?? responders[0].fullname;
      }

      console.warn("Emergency before creation:", emergency);
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
