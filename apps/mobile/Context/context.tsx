import React, { useState, createContext, ReactNode, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../utils/firebase';

interface UserData {
  email: string;
  fullname: string;
  role: string;
  profUrl: string;
}

interface AuthContextType {
  Register: (
    email: string,
    password: string,
    fullname: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  getUserData: () => Promise<UserData | null>;
  updateUserProfile: (userData: Partial<UserData>) => Promise<boolean>;
  error: string;
  isLog: boolean;
  userToken: string | null;
  user: User | undefined;
  userData: UserData | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string>('');
  const [isLog, setIsLog] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
        const token = await user.getIdToken();
        setUserToken(token);
        setIsLog(true);
      } else {
        setUser(undefined);
        setUserData(null);
        setUserToken(null);
        setIsLog(false);
      }
      setIsLoading(false);
    });

    // Initial check for stored token
    checkAuthStatus();

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'user', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const checkAuthStatus = async () => {
    const storedToken = await getItemAsync('userToken');
    const userId = await getItemAsync('userId');

    if (storedToken && userId) {
      setIsLog(true);
      setUserToken(storedToken);
      await fetchUserData(userId);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const getUserData = async () => {
    if (userData) return userData;

    const userId = await getItemAsync('userId');
    if (!userId) return null;

    return await fetchUserData(userId);
  };

  const updateUserProfile = async (newUserData: Partial<UserData>) => {
    try {
      const userId = await getItemAsync('userId');
      if (!userId) return false;

      const userDocRef = doc(db, 'user', userId);
      await updateDoc(userDocRef, newUserData);

      if (userData) {
        setUserData({
          ...userData,
          ...newUserData,
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Failed to update profile');
      return false;
    }
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

            const userData = {
              email,
              fullname,
              role: 'reporter',
              profUrl:
                'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
            };

            await setDoc(doc(db, 'user', user.uid), userData);

            setUser(user);
            setUserData(userData);

            const token = await user.getIdToken();
            await setItemAsync('userId', user.uid);
            await setItemAsync('userToken', token);
            await setItemAsync('userEmail', email);

            setUserToken(token);
            setIsLog(true);

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

            await setItemAsync('userId', user.uid);

            const token = await user.getIdToken();
            setUserToken(token);
            await setItemAsync('userToken', token);
            await setItemAsync('userEmail', email);

            // Fetch and store user data
            const userData = await fetchUserData(user.uid);
            if (userData) {
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
          await FIREBASE_AUTH.signOut();
          await deleteItemAsync('userToken');
          await deleteItemAsync('userId');
          await deleteItemAsync('userEmail');
          setUserToken(null);
          setUser(undefined);
          setUserData(null);
          setIsLog(false);
          setError('');
        },

        checkAuthStatus,
        getUserData,
        updateUserProfile,
        error,
        isLog,
        userToken,
        user,
        userData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
