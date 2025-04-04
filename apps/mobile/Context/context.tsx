import React, { useState, createContext, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, FIREBASE_AUTH } from "../utils/firebase";

interface AuthContextType {
  Register: (
    email: string,
    password: string,
    fullname: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  error: string;
  isLog: boolean;
  userToken: string | null;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string>("");
  const [isLog, setIsLog] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const checkAuthStatus = async () => {
    const storedToken = await getItemAsync("userToken");
    if (storedToken) {
      setIsLog(true);
      setUserToken(storedToken);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        Register: async (email, password, fullname) => {
          try {
            const { user } = await createUserWithEmailAndPassword(
              FIREBASE_AUTH,
              email,
              password
            );

            await setDoc(doc(db, "user", user.uid), {
              email,
              fullname,
              role: "reporter",
            });

            setUser(user);

            return true;
          } catch (error: any) {
            setError(error.code);
            return false;
          }
        },

        login: async (email, password) => {
          try {
            
            const { user } = await signInWithEmailAndPassword(
              FIREBASE_AUTH,
              email,
              password
            );

            setUser(user);

            await setItemAsync("userId", user.uid);

            const token = await user.getIdToken();
            setUserToken(token);
            await setItemAsync("userToken", token);
            await setItemAsync("userEmail", email);

            const userDocRef = await getDoc(doc(db, "user", user.uid));

            if (userDocRef.exists()) {
              setIsLog(true);
              return true;
            }
            return false;
          } catch (error: any) {
            setError(error.code);
            return false;
          }
        },

        logout: async () => {
          await deleteItemAsync("userToken");
          await deleteItemAsync("userId");
          await deleteItemAsync("userEmail");
          setUserToken(null);
          setIsLog(false);
          setError("");
        },

        checkAuthStatus,
        error,
        isLog,
        userToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
