import React, { createContext, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log('Location changed to:', location.pathname);
  }, [location]);

  return (
    <NavigationContext.Provider value={{ location }}>
      {children}
    </NavigationContext.Provider>
  );
};
