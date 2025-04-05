import { getDocs, collection, where, setDoc, doc, query } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

export const signupUser = async (user: UserShape, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);

    const userId = userCredential.user.uid;
    const createdAt = new Date();

    await setDoc(doc(db, "users", userId), {
        ...user,
        id: userId,
        createdAt,
    });

    return {
        ...user,
        id: userId,
        createdAt,
    };
};