// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Perform logout actions, e.g., removing user data from local storage
    setUser(null);
    // Redirect or perform other actions as needed
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
