import React, { useState, useEffect } from 'react';
import FicheAvocat from './FicheAvocat';


const AddFiche = () => {
  
    return (
      <div>
        <FicheAvocat mode={"add"} initialValue={[]} endPoint={`${'http://192.168.10.113/Utilisateur/api/add/ficheAvocat'}`} />
      </div>
    );
}

export default AddFiche