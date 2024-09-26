import React, { useState, createContext, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [wasFormTaxation, setWasFormTaxation] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [draftData, setDraftData]=useState({})

const updateJsonData = (data) => {
  setDraftData(data);
};

useEffect(() => {
  if (location.pathname !== "/home/formTaxation" && prevLocation === "/home/formTaxation" ) {
    submitDraftData(draftData)
    } else {
  }
  setPrevLocation(location.pathname);
}, [location]);


  const submitDraftData = async (params) => {
    try {
      const response = await fetch(
        "http://192.168.10.10/Utilisateur/DossierTaxation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
    if (!params) {
      console.error("No data provided to submitDraftData.");
      return;
    }
  };
  return (
    <NavigationContext.Provider
      value={{
        wasFormTaxation: wasFormTaxation,
        prevLocation,
        setPrevLocation,
        submitDraftData,
        draftData, setDraftData,updateJsonData
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
