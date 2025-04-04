import { addDoc, getDocs, collection, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { query } from "firebase/database";

export const getUserDetails = async (email) => {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDetails = querySnapshot.docs[0].data();
      console.log("User details retrieved:", userDetails);
      return userDetails;
    } else {
      console.log("No user found with the provided email.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user details:", error);
  }
};

export const signupUser = async (user) => {
    try {
      const userRef = collection(db, "users");
      const newUser = await addDoc(userRef, user);
      
      return {
        id: newUser.id,
        ...user
      };
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };