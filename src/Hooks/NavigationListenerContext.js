import React, { useState, createContext, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useGeneraliteContext } from "./GeneraliteContext";

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [wasFormTaxation, setWasFormTaxation] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [draftData, setDraftData] = useState({});

  const { jsonToSend } = useGeneraliteContext(); 
  const { resetAllData } = useGeneraliteContext(); 


  useEffect(() => {
    if (
      location.pathname !== "/home/formTaxation" &&
      prevLocation === "/home/formTaxation" &&
      location.pathname !== "/home/ListeFormulaire"
    ) {
      submitDraftData(jsonToSend);
    }
    setPrevLocation(location.pathname);
  }, [location, draftData, prevLocation]);

  const submitDraftData = async (params) => {
    if (!params || Object.keys(params).length === 0) {
      console.error("No data found.");
      return;
    }

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
        resetAllData(); 
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        wasFormTaxation,
        prevLocation,
        setPrevLocation,
        submitDraftData,
        draftData,
        setDraftData,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
