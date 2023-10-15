import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithPhoneNumber } from 'firebase/auth';
import { db } from './firebase.mjs';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // To Check if the user is already logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // to handle login
  const login = async (phoneNumber, appVerifier) => {
    const auth = getAuth();
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setUser(confirmationResult.user);
      return confirmationResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // to handle logout
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
