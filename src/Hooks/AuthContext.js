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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const cookieSession = cookies.get("COOKIE_SESSION");
      const userCookie = cookies.get("USER_DATA");

      if (cookieSession && userCookie) {
        setIsAuthenticated(true);
        setUser(userCookie);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (value, userData) => {
    const expirationTime = 24 * 60 * 60; 
    const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);

    cookies.set("COOKIE_SESSION", value, {
      path: "/",
      expires: expirationDate,
      sameSite: "Strict",
      secure: true,
      httpOnly:true
    });

    cookies.set("USER_DATA", userData, {
      path: "/",
      expires: expirationDate,
      sameSite: "Strict",
      secure: true,
      httpOnly:true,
    });

    setIsAuthenticated(true);
    setUser(userData);

    console.log("User data dans le Context Tompoko:", `'${userData.email}'`);

    setTimeout(() => {
      cookies.remove("COOKIE_SESSION", { path: "/" });
      cookies.remove("USER_DATA", { path: "/" });
      setIsAuthenticated(false);
      setUser(null);
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
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };
