import React, { useState } from 'react';
import '../../Styles/Document/ContenuDoc.css';

const ContenuDoc = () => {
  const documents = [
    { id: 1, name: 'Contrat de travail', type: 'Contrat', description: 'Contrat pour un employé' },
    { id: 2, name: 'Facture 2024', type: 'Facture', description: 'Facture pour le mois de janvier' },
    { id: 3, name: 'Convention de partenariat', type: 'Contrat', description: 'Convention avec un partenaire' },
    { id: 4, name: 'Contrat de location', type: 'Contrat', description: 'Contrat pour une location immobilière' },
    { id: 5, name: 'Rapport financier Q1', type: 'Rapport', description: 'Rapport financier du premier trimestre' },
    { id: 6, name: 'Facture 2023', type: 'Facture', description: 'Facture de l\'année 2023' },
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [searchTerm, setSearchTerm] = useState('');

  const filterDocuments = (type) => {
    if (type === 'All') {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter(doc => doc.type === type));
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const lowercasedSearchTerm = event.target.value.toLowerCase();
    setFilteredDocuments(documents.filter(doc => doc.name.toLowerCase().includes(lowercasedSearchTerm) || doc.description.toLowerCase().includes(lowercasedSearchTerm)));
  };

  return (
    <div className="mainContainerDoc">
      <h2 className="documentListTitle">Liste des Documents</h2>
      
      <div className="filterSection">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
          className="searchInput"
        />
        <div className="filterButtons">
          <button className="filterButton" onClick={() => filterDocuments('All')}>Tous</button>
          <button className="filterButton" onClick={() => filterDocuments('Contrat')}>Contrats</button>
          <button className="filterButton" onClick={() => filterDocuments('Facture')}>Factures</button>
          <button className="filterButton" onClick={() => filterDocuments('Rapport')}>Rapports</button>
        </div>
      </div>

      <div className="documentList">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="documentCard">
            <h3 className="documentName">{doc.name}</h3>
            <p className="documentDescription">{doc.description}</p>
            <button className="viewButton">Voir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContenuDoc;
