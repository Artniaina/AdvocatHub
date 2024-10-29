import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const UpdateDataContext = createContext();

export const UpdateDataProvider = ({ children }) => {
  const [formulaireData, setFormulaireData] = useState({});
  const domaineArray = formulaireData?.sDomaineJuridique?.split(",") || [];
  const { user } = useAuth();

  const initialFormData = {
    domaine: domaineArray || [],
    honoraire: formulaireData?.sHonoraireData || [],
    provision: formulaireData?.sProvision || [],
    montant: formulaireData?.sMontant || [],
    nomAffaire: formulaireData?.sNomAffaire || "",
    termesHonoraires: formulaireData?.sTermesHonoraires || "",
    absenceTerm: formulaireData?.sAbsenceTermes || "",
    datecontest: formulaireData?.sDateContestation || "",
    dateDebut: formulaireData?.sDateDebutMandat || "",
    dateFin: formulaireData?.sDateFinMandat || "",
    etatAvancement: formulaireData?.sEtatAvancement || "",
    conserv: formulaireData?.sMesureConservatoire || "",
    mediation: formulaireData?.sMediation || "",
    relative: formulaireData?.sProcedureRelative || "",
    conciliation: formulaireData?.sConciliation || "",
  };

  const initialShowOptions = {
    notes: formulaireData?.sMontant?.length ? "oui" : "non",
    termesHonoraires:
      formulaireData?.sTermesHonoraires !== "non" ? "oui" : "non",
    etatAvancement: formulaireData?.sEtatAvancement !== "non" ? "oui" : "non",
    conciliation: formulaireData?.sConciliation !== "non" ? "oui" : "non",
    relative: formulaireData?.sProcedureRelative !== "non" ? "oui" : "non",
    conserv: formulaireData?.sMesureConservatoire !== "non" ? "oui" : "non",
    mediation: formulaireData?.sMediation !== "non" ? "oui" : "non",
    mediationChoix: formulaireData?.sMediationChoix !== "non" ? "oui" : "non",
  };

  const initialEditorContents = {
    observation: formulaireData?.sObservations || "",
    position: formulaireData?.sPositionAvocat || "",
    c1: formulaireData?.sContenu1 || "",
    c2: formulaireData?.sContenu2 || "",
    c3: formulaireData?.sContenu3 || "",
    c4: formulaireData?.sContenu4 || "",
    c5: formulaireData?.sContenu5 || "",
    c6: formulaireData?.sContenu6 || "",
  };
 
  const AvocatArray= formulaireData?.sAvocatsData || []
  const initialAvocatsData = AvocatArray.map((avocat) => ({
    nom: avocat.nom || "",
    prenom: avocat.prenom || "",
    setude: avocat.setude || "",
    adresseEtude: avocat.adresseEtude || "",
    telephone: avocat.telephone || "",
    email: avocat.email || "",
    dateAssermentation: avocat.dateAssermentation || "",
    isSocieteChecked: avocat.isSocieteChecked || false,
  }));
  

  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState(domaineArray);
  const [montantData, setMontantData] = useState([]);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);
  const [noteHonoraire, setNoteHonoraire] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [avocatsData, setAvocatsData] = useState(initialAvocatsData || []);
  const [showOptions, setShowOptions] = useState(initialShowOptions);
  const [formData, setFormData] = useState(initialFormData);
  const [editorContents, setEditorContents] = useState(initialEditorContents);
  const allIsSocieteChecked = initialAvocatsData.map((avocat) => avocat.isSocieteChecked);
  const singleValue = allIsSocieteChecked[0]; 
  const [isSocieteChecked, setIsSocieteChecked] = useState(singleValue);

  useEffect(() => {
    if (formulaireData) {
      setFormData((prev) => ({ ...initialFormData, ...formulaireData }));
      setShowOptions(initialShowOptions);
      setClientData(formulaireData?.sClientsData || []);
      setSelectedAvocats(formulaireData?.sCollaboratorsData || []);
      setSelectedDomains(domaineArray || []);
      setPrestataires(formulaireData?.sPrestataireData || []);
      setMontantData(formulaireData?.sMontant || []);
      setProvisionData(formulaireData?.sProvision || []);
      setHonoraireData(formulaireData?.sHonoraireData || []);
      setNoteHonoraire(formulaireData?.sNoteHonoraire || []);
      setEditorContents(initialEditorContents);
      setAvocatsData(initialAvocatsData );
      setIsSocieteChecked(singleValue);
    }
  }, [formulaireData]);

console.log(singleValue);

  const currentDate = new Date();
  const formattedDate =
    String(currentDate.getDate()).padStart(2, "0") +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    currentDate.getFullYear();

  const jsonToUpdate = {
    sStatutFormulaire: "non transmis",
    sEmailUtilisateur: user ? user.email : "",
    sDomaineJuridique: formData.domaine.join(","),
    sNomAffaire: formData.nomAffaire,
    sTermesHonoraires: formData.termesHonoraires,
    sAbsenceTermes: formData.absenceTerm,
    sDateContestation: formData.datecontest,
    sDateDebutMandat: formData.dateDebut,
    sDateFinMandat: formData.dateFin,
    sEtatAvancement: formData.etatAvancement,
    sMesureConservatoire: formData.conserv,
    sMediation: formData.mediation,
    sMediationChoix: showOptions.mediationChoix,
    sConciliation: formData.conciliation,
    sProcedureRelative: formData.relative,
    sObservations: editorContents.observation,
    sPositionAvocat: editorContents.position,
    sContenu1: editorContents.c1,
    sContenu2: editorContents.c2,
    sContenu3: editorContents.c3,
    sContenu4: editorContents.c4,
    sContenu5: editorContents.c5,
    sContenu6: editorContents.c6,
    sMontant: montantData,
    sNoteHonoraire: noteHonoraire,
    sHonoraireData: honoraireData,
    sProvision: provisionData,
    sPrestataireData: prestataires,
    sCollaboratorsData: selectedAvocats,
    sAvocatsData: avocatsData,
    sClientsData: clientData,
    sSubmited_at: formattedDate,
  };

  return (
    <UpdateDataContext.Provider
      value={{
        clientData,
        setClientData,
        selectedAvocats,
        setSelectedAvocats,
        prestataires,
        setPrestataires,
        selectedDomains,
        setSelectedDomains,
        montantData,
        setMontantData,
        honoraireData,
        setHonoraireData,
        provisionData,
        setProvisionData,
        showOptions,
        setShowOptions,
        avocatsData,
        setAvocatsData,
        isSocieteChecked, setIsSocieteChecked,
        noteHonoraire,
        setNoteHonoraire,
        editorContents,
        setEditorContents,
        fileInfos,
        setFileInfos,
        formData,
        setFormData,
        jsonToUpdate,
        formulaireData,
        setFormulaireData,
      }}
    >
      {children}
    </UpdateDataContext.Provider>
  );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
