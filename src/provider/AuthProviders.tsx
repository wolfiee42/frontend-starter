import { createContext, memo, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import useAxiosSecure from "../hooks/useAxiosSecure";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleSignIn: () => Promise<any>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProvidersProps {
  children: React.ReactNode;
}

const AuthProviders = memo(function AuthProvidersComponent({ children }: AuthProvidersProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        axiosSecure.get("/auth/clear-token").then(() => {});
      }
    });

    return () => {
      return unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name: string, photo: string) => {
    setLoading(true);
    return updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    googleSignIn,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
});

export default AuthProviders;
