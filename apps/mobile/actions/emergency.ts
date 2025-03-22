import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
export const createEmergencyRecord = async () => {
  try {
    const emergencyRef = collection(db, "emergencies");
    const newEmergency = await addDoc(emergencyRef, {
      type: "Fire",
      location: "Test Location",
      description: "Test emergency situation",
      timestamp: new Date(),
      status: "pending",
    });
    console.log("Emergency created with ID:", newEmergency.id);
  } catch (error) {
    console.error("Error creating emergency:", error);
  }
};
