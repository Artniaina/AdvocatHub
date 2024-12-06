import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../../Hooks/AuthContext";
import "../../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../../assets/icons8-user-menu-male-40.png";
import { fetchAvocatInfo, fetchEtudeInfo } from "../../../../../Store/AvocatSlice";
import { useUpdateDataContext } from "../../../../../Hooks/UpdatedDataContext";

const Avocat = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { avocatsData, setAvocatsData } = useUpdateDataContext();

  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);

  const [nom, setNom] = useState(avocatInfo?.m_sNom || "");
  const [prenom, setPrenom] = useState(avocatInfo?.m_sPrenom || "");
  const [dateAssermentation, setDateAssermentation] = useState(avocatInfo?.m_dDateAssermentation || "");
  const [telephone, setTelephone] = useState(avocatInfo?.m_stelephone ||"");
  const [email, setEmail] = useState(avocatInfo?.m_emailbarreau || "");
  const [denomination, setDenomination] = useState(etudeInfo?.m_sDénominationEtude || "");
  const [adressePro, setAdressePro] = useState(etudeInfo?.m_sadressecomplet || "");
  const [dateInscription, setDateInscription] = useState(etudeInfo?.m_dDateInscription || "");
  const [isSocieteChecked, setIsSocieteChecked] = useState(false);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(user.email));
    }
  }, [dispatch, user]);


  useEffect(() => {
    // if (avocatInfo?.m_nidetude) {
      // dispatch(fetchEtudeInfo(avocatInfo.m_nidetude));
      dispatch(fetchEtudeInfo(1));
    // }
  }, [dispatch, avocatInfo]);

  
  useEffect(() => {
    if (avocatInfo) {
      setNom(avocatInfo.m_sNom);
      setPrenom(avocatInfo.m_sPrenom);
      setDateAssermentation(avocatInfo.m_dDateAssermentation);
      setTelephone(etudeInfo?.m_stelephone);
      setEmail(avocatInfo.m_emailbarreau);
      setDenomination(etudeInfo?.m_sDénominationEtude || "");
      setAdressePro(etudeInfo?.m_sadressecomplet || "");
      setDateInscription(etudeInfo?.m_dDateInscription || "");
    }
  }, [avocatInfo, etudeInfo]);

  useEffect(() => {
    setAvocatsData([{
      nom,
      prenom,
      dateAssermentation,
      telephone,
      email,
      dateInscription,
      adressePro,
      denomination,
      isSocieteChecked,
    }]);
  }, [nom, prenom, dateAssermentation, telephone, email, dateInscription, adressePro, denomination, isSocieteChecked, setAvocatsData]);

  const handleCheckboxChange = (e) => {
    setIsSocieteChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <div className="titleCard">
        <img
          src={Image}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            position: "relative",
            top: "5px",
          }}
        />{" "}
        AVOCAT (titulaire du dossier)
      </div>

      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="formGroup">
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" value={nom} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" value={prenom} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude:</label>
          <input type="text" id="etude" value={denomination} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="adresseEtude">Adresse de l'étude:</label>
          <input type="text" id="adresseEtude" value={adressePro} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="dateAssermentation">Date d'assermentation:</label>
          <input type="text" id="dateAssermentation" value={dateAssermentation} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="telephone">Téléphone:</label>
          <input type="text" id="telephone" value={telephone} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} readOnly />
        </div>

        <div style={{ margin: "10px" }}>
          <input
            type="checkbox"
            id="societe"
            name="societe"
            checked={isSocieteChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="societe">
            <strong style={{ color: "#595b69", fontSize: "18px" }}>
              Société d'avocats
            </strong>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Avocat;
