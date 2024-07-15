import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [isSimpleAuthenticated, setIsSimpleAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isSimpleAuthenticated,
        setIsSimpleAuthenticated,
        isAuthenticated,
        setIsAuthenticated,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };
