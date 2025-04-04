import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.API_KEY,
    authDomain: "response-emergency-system.firebaseapp.com",
    databaseURL:
        "https://response-emergency-system-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "response-emergency-system",
    storageBucket: "response-emergency-system.firebasestorage.app",
    messagingSenderId: "27713063649",
    appId: "1:27713063649:web:d651dc0a8b14a20eae85a0",
};

const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);

// Initialize Firestore
export const db = getFirestore(app);
