// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider component is a context provider for managing user authentication state.
 * It uses Firebase's `onAuthStateChanged` to listen for changes in the authentication state
 * and provides the current user to the rest of the application through React Context.
 *
 *
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Don’t render children until we know auth state
  if (initializing) {
    return null; // or a spinner `<CircularProgress />`
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}