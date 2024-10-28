import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const UpdateDataContext = createContext();

export const UpdateDataProvider = ({ children }) => {
  const [formulaireData, setFormulaireData] = useState({});
  const domaineArray = formulaireData?.sDomaineJuridique?.split(",") || [];
  const { user } = useAuth();

  const initialFormData = {
    domaine: [],
    honoraire: [],
    provision: [],
    montant: [],
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
    termesHonoraires: formulaireData?.sTermesHonoraires !== "non" ? "oui" : "non",
    etatAvancement: formulaireData?.sEtatAvancement !== "non" ? "oui" : "non",
    conciliation: formulaireData?.sConciliation !== "non" ? "oui" : "non",
    relative: formulaireData?.sProcedureRelative !== "non" ? "oui" : "non",
    conserv: formulaireData?.sMesureConservatoire !== "non" ? "oui" : "non",
    mediation: formulaireData?.sMediation !== "non" ? "oui" : "non",
    mediationChoix: formulaireData?.sMediationChoix !== "non" ? "oui" : "non",
  };

  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState(domaineArray);
  const [montantData, setMontantData] = useState([]);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);
  const [noteHonoraire, setNoteHonoraire] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [avocatsData, setAvocatsData] = useState([{ nom: "", prenom: "", setude: "", adresseEtude: "", telephone: "", email: "", dateAssermentation: "", isSocieteChecked: "" }]);
  const [showOptions, setShowOptions] = useState(initialShowOptions);
  const [formData, setFormData] = useState(initialFormData);

  const [editorContents, setEditorContents] = useState({ observation: "", position: "", c1: "", c2: "", c3: "", c4: "", c5: "", c6: "" });

  useEffect(() => {
    if (formulaireData) {
      setFormData((prev) => ({ ...initialFormData, ...formulaireData }));
      setShowOptions(initialShowOptions);
      setClientData(formulaireData?.sClientsData || []);
      setSelectedAvocats(formulaireData?.sCollaboratorsData || []);
      setSelectedDomains(domaineArray);
      setPrestataires(formulaireData?.sPrestataireData || []);
      setMontantData(formulaireData?.sMontant || []);
      setProvisionData(formulaireData?.sProvision || []);
      setHonoraireData(formulaireData?.sHonoraireData || []);
    }
  }, [formulaireData]);

  const resetAllData = () => {
    setClientData([]);
    setSelectedAvocats([]);
    setPrestataires([]);
    setSelectedDomains([]);
    setMontantData([]);
    setHonoraireData([]);
    setProvisionData([]);
    setNoteHonoraire([]);
    setFileInfos([]);
    setShowOptions({
      affaire: "non",
      honoraires: "non",
      notes: "non",
      termesHonoraires: "non",
      etatAvancement: "non",
      conciliation: "non",
      relative: "non",
      conserv: "non",
      mediation: "non",
      mediationChoix: "non",
    });
    setFormData(initialFormData);
    setEditorContents({ observation: "", position: "", c1: "", c2: "", c3: "", c4: "", c5: "", c6: "" });
  };

  const currentDate = new Date().toISOString();
  const jsonToSend = {
    sStatutFormulaire: "non transmis",
    sEmailUtilisateur: user?.email || "",
    sDomaineJuridique: formData.domaine.join(","),
    ...formData,
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
    sSubmited_at: currentDate,
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
        noteHonoraire,
        setNoteHonoraire,
        editorContents,
        setEditorContents,
        fileInfos,
        setFileInfos,
        formData,
        setFormData,
        resetAllData,
        jsonToSend,
        formulaireData,
        setFormulaireData,
      }}
    >
      {children}
    </UpdateDataContext.Provider>
  );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
