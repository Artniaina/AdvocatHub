import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isSimpleAuthenticated, setIsSimpleAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const cookieSession = cookies.get("COOKIE_SESSION");
      if (cookieSession) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (username) => {
    const expirationTime = 24 * 60 * 60;
    const currentTime = new Date();
    const expirationDate = new Date(
      currentTime.getTime() + expirationTime * 1000
    );

    cookies.set("COOKIE_SESSION", username, {
      path: "/",
      maxAge: expirationTime,
      sameSite: "Lax",
    });
    setIsAuthenticated(true);

    setTimeout(() => {
      cookies.remove("COOKIE_SESSION", { path: "/" });
      console.log("Cookie removed after expiration time");
      setIsAuthenticated(false);
    }, expirationTime * 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        isSimpleAuthenticated,
        setIsSimpleAuthenticated,
        isAuthenticated,
        setIsAuthenticated,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        isLoading,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };
