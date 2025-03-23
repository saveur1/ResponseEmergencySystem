import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
interface EmergencyProps {
    type: string;
    location: string;
    description: string;
    timestamp: Date;
    status: string;
}

export const createEmergencyRecord = async (emergency: EmergencyProps) => {
  try {
    const emergencyRef = collection(db, "emergencies");
    const newEmergency = await addDoc(emergencyRef, emergency);
    console.log("Emergency created with ID:", newEmergency.id);
  } catch (error) {
    console.error("Error creating emergency:", error);
  }
};
