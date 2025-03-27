import { API_KEY } from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: API_KEY,  
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

export const db = getFirestore(app);
export const storage = getStorage(app);
export const FIREBASE_AUTH = getAuth(app)
