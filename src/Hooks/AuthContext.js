import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

 const useAuth = () => useContext(AuthContext);
 const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, useAuth, AuthProvider };
