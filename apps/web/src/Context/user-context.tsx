import React, { useState, createContext, ReactNode, Dispatch, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { UserShape } from "types";
import { getUserDetails } from "actions/users";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
    register: (user: UserShape, password: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    error: string;
    isLog: boolean;
    user: UserShape | undefined;
    setError: Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setUser: Dispatch<React.SetStateAction<UserShape | undefined>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [error, setError] = useState<string>("");
    const [isLog, setIsLog] = useState<boolean>(false);
    const [user, setUser] = useState<UserShape>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clearState = () => {
        setError("");
        setIsLog(false);
        setUser(undefined);
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const parsedUser: UserShape = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLog(true);
            }
        };

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                register: async (user: UserShape, password: string) => {
                    try {
                        setIsLoading(true);
                        setError("");
                        const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);

                        const userId = userCredential.user.uid;
                        const createdAt = new Date();

                        await setDoc(doc(db, "users", userId), {
                            ...user,
                            id: userId,
                            createdAt,
                        });

                        setUser({ ...user, id: userId, createdAt });
                        localStorage.setItem("currentUser", JSON.stringify({ ...user, id: userId, createdAt }));
                        setIsLog(true);
                        setIsLoading(false);

                        return true;
                    } catch (error) {
                        if ((error as FirebaseError).code === "auth/email-already-in-use")
                            setError("Email already in use!");
                        else if ((error as FirebaseError).code === "auth/invalid-email")
                            setError("Invalid email address!");
                        else
                            setError((error as FirebaseError).message || `Something went wrong, try again!`);

                        setIsLoading(false);
                        return false;
                    }
                },

                login: async (email, password) => {
                    clearState();
                    setIsLoading(true);

                    try {
                        const userCredential = await signInWithEmailAndPassword(auth, email, password);
                        const storedUser = await getUserDetails(userCredential?.user?.email!);
                        setIsLog(true);

                        if (!storedUser) {
                            throw new Error("User not found");
                        }

                        setUser(storedUser);
                        localStorage.setItem("currentUser", JSON.stringify(storedUser));
                        setError("");

                        return true;
                    } catch (error) {
                        if ((error as FirebaseError).code === "auth/invalid-credential")
                            setError("Invalid email or password!");
                        else
                            setError((error as FirebaseError).message || `Something went wrong, try again!`);

                        return false;
                    } finally {
                        setIsLoading(false);
                    }
                },

                logout: async () => {
                    clearState();
                    await auth.signOut();
                },
                error,
                isLog,
                user,
                isLoading,
                setError,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
