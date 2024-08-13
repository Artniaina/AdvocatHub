import React from 'react'

const Affaire = () => {
  return (
    <div>
      <div className="formGroup">
          <label htmlFor="formation">Domaine(s) juridique(s) * : </label>
          <textarea
            id="autreInfo"
            readOnly
          />
        </div>
      <div className="formGroup">
          <label htmlFor="formation">Nom de l'affaire * : </label>
          <textarea
            id="autreInfo"
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Date de début du mandat * :</label>
          <input
            type="date"
            id="email"
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Date de fin du mandat * :</label>
          <input
            type="date"
            id="email"
            readOnly
          />
        </div>
    </div>
  )
}

export default Affaire