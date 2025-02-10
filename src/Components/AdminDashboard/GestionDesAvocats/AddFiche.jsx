import React, { useState, useEffect } from 'react';
import FicheAvocat from './FicheAvocat';


const AddFiche = () => {
  
    return (
      <div>
        <FicheAvocat mode={"add"} initialValue={[]} />
      </div>
    );
}

export default AddFiche