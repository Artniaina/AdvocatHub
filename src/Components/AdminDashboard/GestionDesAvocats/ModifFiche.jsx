import React, { useState, useEffect } from 'react'
import FicheAvocat from './FicheAvocat'

const ModifFiche = () => {
  const [initialAvocat, setInitialAvocat] =useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://192.168.10.113/Utilisateur/AllAvocat/ListeAvocat"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const data = await response.json();
          console.log("Fetched data:", data);
  
          setInitialAvocat(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [user]);
console.log(initialAvocat);

  return (
    <div>
      <FicheAvocat mode={"edit"} initialValue={initialAvocat} />
    </div>
  )
}

export default ModifFiche