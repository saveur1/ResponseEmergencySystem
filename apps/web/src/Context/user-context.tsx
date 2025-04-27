import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  useEffect
} from 'react'
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { UserShape } from "types";
import { getUserDetails, getUserDetailsById } from "actions/users";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    register: (user: UserShape, password: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    forgotPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string;
    isLog: boolean;
    user: UserShape | undefined;
    setError: Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setUser: Dispatch<React.SetStateAction<UserShape | undefined>>
    isLoginLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string>('')
  const [isLog, setIsLog] = useState<boolean>(false)
  const [user, setUser] = useState<UserShape>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const clearState = () => {
    setError('')
    setIsLog(false)
    setUser(undefined)
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoginLoading(true)

      if (firebaseUser) {
        try {
          // First try to get user details using the current firebase user
          const userDetails = await getUserDetails(firebaseUser.email!)

          if (userDetails) {
            setUser(userDetails)
            setIsLog(true)
            localStorage.setItem('currentUser', userDetails.id!)
          } else {
            // If not found by email, try with stored ID as fallback
            const userId = localStorage.getItem('currentUser')
            if (userId) {
              const userById = await getUserDetailsById(userId)
              if (userById) {
                setUser(userById)
                setIsLog(true)
              } else {
                // Clear invalid localStorage data
                localStorage.removeItem('currentUser')
              }
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error)
          setError('Error loading user profile')
        }
      } else {
        // If Firebase says we're not logged in, clear localStorage and state
        localStorage.removeItem('currentUser')
        setUser(undefined)
        setIsLog(false)
      }

      setIsLoginLoading(false)
    })

    // Return the unsubscribe function for cleanup
    return () => unsubscribe()
  }, [])

  const handleCheckRoleAndRedirect = (user: UserShape) => {
    if (!['admin', 'responder'].includes(user?.role)) {
      const err = 'The current user is not allowed to login'
      setError(err)
      throw new Error(err)
    }

    setUser(user)
    localStorage.setItem('currentUser', user?.id!)
    setIsLog(true)

    if (user.role === 'admin') {
      navigate('/dashboard')
    } else if (user.role === 'responder') {
      navigate('/')
    }

    setIsLoading(false)
  }

  const handleFirebaseError = (error: FirebaseError) => {
    if (error.code === 'auth/email-already-in-use')
      setError('Email already in use!')
    else if (error.code === 'auth/invalid-email')
      setError('Invalid email address!')
    else if (error.code === 'auth/invalid-credential')
      setError('Invalid email or password!')
    else setError(error.message || `Something went wrong, try again!`)
  }

  // Rest of the code remains the same
  return (
    <AuthContext.Provider
      value={{
        register: async (user: UserShape, password: string) => {
          try {
            setIsLoading(true)
            setError('')
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              user.email,
              password
            )

            const userId = userCredential.user.uid
            const createdAt = new Date()

            await setDoc(doc(db, 'users', userId), {
              ...user,
              id: userId,
              createdAt
            })

            handleCheckRoleAndRedirect({ ...user, id: userId, createdAt })

            return true
          } catch (error) {
            handleFirebaseError(error as FirebaseError)
            setIsLoading(false)
            return false
          }
        },

        login: async (email, password) => {
          clearState()
          setIsLoading(true)

          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            )
            const storedUser = await getUserDetails(
              userCredential?.user?.email!
            )
            setIsLog(true)

            if (!storedUser) {
              throw new Error('User not found')
            }
            handleCheckRoleAndRedirect(storedUser)

                        return true;
                    } catch (error) {
                        handleFirebaseError(error as FirebaseError)
                        return false;
                    
                    } finally {
                        setIsLoading(false);
                    }
                },

                forgotPassword: async (email) => {
                    try {
                        setIsLoading(true);
                        await sendPasswordResetEmail(auth, email);
                        setError("Check your email for password reset link");
                    } catch (error) {
                        handleFirebaseError(error as FirebaseError);
                    } finally {
                        setIsLoading(false);
                    }
                },

        logout: async () => {
          clearState()
          localStorage.removeItem('currentUser')
          await auth.signOut()
        },
        error,
        isLog,
        user,
        isLoading,
        setError,
        setUser,
        isLoginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
