import { db } from "../utils/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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


export const generateEmergencyStatistics = async()=> {
    const emergencies = await fetchEmergencies();
    let totalEmergencies = emergencies.length;

    // Calculate percentage increase in emergencies from last month
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const emergenciesLastMonth = emergencies.filter((e) => {
        const emergencyDate = new Date(e.timestamp); // Assuming `date` is a field in tEmergency
        return emergencyDate.getMonth() === lastMonth;
    }).length;

    console.log(emergenciesLastMonth, totalEmergencies);
    let percentageEmergenciesIncreaseFromLastMonth = emergenciesLastMonth
        ? ((totalEmergencies - emergenciesLastMonth) / emergenciesLastMonth) * 100
        : 0;

    // Calculate total fire emergencies and those from the last 24 hours
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    let totalFireEmergencies = 0;
    let totalFireEmergenciesFromLast24Hours = 0;

    // Calculate total assault emergencies and those from the last 24 hours
    let totalAssaultEmergencies = 0;
    let totalAssaultEmergenciesFromLast24Hours = 0;

    // Calculate total flood emergencies and those from the last 24 hours
    let totalFloodEmergenciesIncidents = 0;
    let totalFloodEmergenciesFromLast24Hours = 0;

    emergencies.forEach((e) => {
        const emergencyDate = new Date(e.timestamp); // Assuming `date` is a field in tEmergency
        if (e.type === "Fire") {
            totalFireEmergencies++;
            if (emergencyDate >= last24Hours) {
                totalFireEmergenciesFromLast24Hours++;
            }
        } else if (e.type === "Assault") {
            totalAssaultEmergencies++;
            if (emergencyDate >= last24Hours) {
                totalAssaultEmergenciesFromLast24Hours++;
            }
        } else if (e.type === "Flood") {
            totalFloodEmergenciesIncidents++;
            if (emergencyDate >= last24Hours) {
                totalFloodEmergenciesFromLast24Hours++;
            }
        }
    });

    // Get the last three emergencies
    let lastThreeEmergencies = emergencies
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 3);

    return {
        totalEmergencies,
        percentageEmergenciesIncreaseFromLastMonth,
        totalFireEmergencies,
        totalFireEmergenciesFromLast24Hours,
        totalAssaultEmergencies,
        totalAssaultEmergenciesFromLast24Hours,
        totalFloodEmergenciesIncidents,
        totalFloodEmergenciesFromLast24Hours,
        lastThreeEmergencies,
    };
}

export const updateEmergencyStatus = async (emergencyId: string, newStatus: string) => {
    try {
        const emergencyRef = collection(db, "emergencies");
        const emergencyDoc = doc(emergencyRef, emergencyId);
        await updateDoc(emergencyDoc, { status: newStatus });

        const updatedEmergencySnapshot = await getDocs(emergencyRef);
        const updatedEmergency = updatedEmergencySnapshot.docs
            .map((doc) => ({ id: doc.id, ...(doc.data()) }))
            .find((e) => e.id === emergencyId);

        return updatedEmergency as unknown as tEmergency;
    } catch (error) {
        console.error("Error updating emergency status:", error);
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

export const deleteEmergence = async (EmeId: string) => {
      try {
        const EmeDocRef = doc(db, 'emergencies', EmeId)
        await deleteDoc(EmeDocRef)
        console.log(`Emergence with ID ${EmeId} has been deleted`)
        return true
      } catch (error) {
        console.error('Error deleting emergence:', error)
        return false
      }
}

  
