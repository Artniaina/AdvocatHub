import React, { useState, createContext, useEffect, useContext } from "react";
import { json, useLocation } from "react-router-dom";
import { useGeneraliteContext } from "./GeneraliteContext";
import { useUpdateDataContext } from "./UpdatedDataContext";

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  const { jsonToSend, resetAllData, initialJsonToSend } = useGeneraliteContext();
  const { jsonToUpdate, formulaireData } = useUpdateDataContext();
 
  useEffect(() => {
    if (
      location.pathname !== "/home/formTaxation" &&
      prevLocation === "/home/formTaxation" &&
      location.pathname !== "/home/ListeFormulaire"
    ) {
      submitDraftData(jsonToSend);
    }

    setPrevLocation(location.pathname);
  }, [location, jsonToSend, formulaireData, prevLocation]);

  useEffect(() => {
    if (
      location.pathname !== "/home/UpdateformTaxation" &&
      prevLocation === "/home/UpdateformTaxation" &&
      location.pathname !== "/home/ListeFormulaire"
    ) {
      UpdateDraftData(jsonToUpdate);
    }

    setPrevLocation(location.pathname);
  }, [location, jsonToUpdate, formulaireData, prevLocation]);

  const UpdateDraftData = async (params) => {
    const idFormulaire = formulaireData?.sIDFormulaire;

    if (!params || Object.keys(params).length === 0) {
      console.error("Nso data found to submit.");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.10.102/Utilisateur/ModifForm/${idFormulaire}`,
        {
          method: "PUT",
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
  const submitDraftData = async (params) => {
    if (!params || Object.keys(params).length === 0) {
      console.error("No data found.");
      return;
    }
  
    if (JSON.stringify(params) == JSON.stringify(initialJsonToSend)) {
      console.log("No changes detected. Skipping submission.");
      return
    }
  
    try {
      const response = await fetch(
        "http://192.168.10.102/Utilisateur/DossierTaxation",
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
        prevLocation,
        setPrevLocation,
        submitDraftData,
        UpdateDraftData,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
