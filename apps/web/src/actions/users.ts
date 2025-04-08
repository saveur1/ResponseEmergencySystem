import { getDocs, collection, where, setDoc, doc, query, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { UserShape } from "types";

export const getUserDetails = async (email: string) => {
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const userDetails = querySnapshot.docs[0].data() as unknown as UserShape;
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

export const getUserDetailsById = async (id: string) => {
    try {
        const userDocRef = doc(db, "users", id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userDetails = userDoc.data() as unknown as UserShape;
            return userDetails;
        } else {
            console.log("No user found with the provided ID.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user details by ID:", error);
        return null;
    }
};

export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users')
    const querySnapshot = await getDocs(usersRef)

    if (!querySnapshot.empty) {
      const users = querySnapshot.docs.map((doc) => {
        return doc.data() as UserShape
      })
      console.log('All users retrieved:', users)
      return users
    } else {
      console.log('No users found in the database.')
      return []
    }
  } catch (error) {
    console.error('Error retrieving all users:', error)
    return []
  }
}