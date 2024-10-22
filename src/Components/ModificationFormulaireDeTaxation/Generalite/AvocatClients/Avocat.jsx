import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../Hooks/AuthContext";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-user-menu-male-40.png";
import { fetchAvocatInfo, fetchEtudeInfo } from "../../../../Store/AvocatSlice";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";

const Avocat = () => {
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);
  const { user } = useAuth();
  const [isSocieteChecked, setIsSocieteChecked] = useState(false);
  const { avocatsData, setAvocatsData } = useGeneraliteContext();

  const handleCheckboxChange = (e) => {
    setIsSocieteChecked(e.target.checked);
  };

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(user.email));
    }
  }, [dispatch, user]);

  const [id, setId] = useState(avocatInfo?.m_nidetude);

  useEffect(() => {
    if (avocatInfo?.m_nidetude) {
      dispatch(fetchEtudeInfo(avocatInfo.m_nidetude));
    }
  }, [dispatch, avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setId(avocatInfo.m_nidetude);
    }
  }, [avocatInfo]);

  const [nom, setNom] = useState(avocatInfo?.m_sNom || "");
  const [prenom, setPrenom] = useState(avocatInfo?.m_sPrenom || "");
  const [setude, setEtude] = useState(etudeInfo?.m_sDénominationEtude || "");
  const [adresseEtude, setAdresseEtude] = useState(
    etudeInfo?.m_sadressecomplet || ""
  );
  const [dateAssermentation, setDateAssermentation] = useState(
    avocatInfo?.m_dDateAssermentation || ""
  );
  const [telephone, setTelephone] = useState(avocatInfo?.m_stelephonetri || "");
  const [email, setEmail] = useState(avocatInfo?.m_emailbarreau || "");

  useEffect(() => {
    if (etudeInfo) {
      setEtude(etudeInfo.m_sDénominationEtude);
    }
  }, [etudeInfo]);
  useEffect(() => {
    if (etudeInfo) {
      setAdresseEtude(etudeInfo.m_sadressecomplet);
    }
  }, [etudeInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setNom(avocatInfo.m_sNom);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setPrenom(avocatInfo.m_sPrenom);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setDateAssermentation(avocatInfo.m_dDateAssermentation);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setTelephone(avocatInfo.m_stelephonetri);
    }
  }, [avocatInfo]);
  useEffect(() => {
    if (avocatInfo) {
      setEmail(avocatInfo.m_emailbarreau);
    }
  }, [avocatInfo]);

  useEffect(() => {
    setAvocatsData([
      {
        nom,
        prenom,
        setude,
        adresseEtude,
        dateAssermentation,
        telephone,
        email,
        isSocieteChecked,
      },
    ]);
  }, [
    nom,
    prenom,
    setude,
    adresseEtude,
    dateAssermentation,
    telephone,
    email,
    isSocieteChecked,
    setAvocatsData,
  ]);


  const handleSubmit = (e) => {
    e.preventDefault();
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
          <input type="text" id="etude" value={setude} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="adresseEtude">Adresse de l'étude:</label>
          <input type="text" id="adresseEtude" value={adresseEtude} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="dateAssermentation">Date d'assermentation:</label>
          <input
            type="text"
            id="dateAssermentation"
            value={dateAssermentation}
            readOnly
          />
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
            value="societe"
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
