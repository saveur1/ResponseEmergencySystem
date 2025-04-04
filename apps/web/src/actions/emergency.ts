import { db } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { tEmergency } from "types";

export const createEmergencyRecord = async (emergency: tEmergency) => {
  try {
    const emergencyRef = collection(db, "emergencies");
    const newEmergency = await addDoc(emergencyRef, emergency);
    console.log("Emergency created with ID:", newEmergency.id);
  } catch (error) {
    console.error("Error creating emergency:", error);
  }
};


  // Function to fetch all emergencies
export const fetchEmergencies = async () => {
    try {
      const emergencyRef = collection(db, "emergencies");
      const snapshot = await getDocs(emergencyRef);
      
      const emergencies = snapshot.docs.map((doc) => ({
        id: doc.id, // Assign document ID
        ...(doc.data()), // Ensure the data matches EmergencyProps
      }));
      
      return emergencies as tEmergency[]; // Cast to tEmergency type
    } catch (error) {
      console.error("Error fetching emergencies:", error);
      return [];
    }
  };

  
