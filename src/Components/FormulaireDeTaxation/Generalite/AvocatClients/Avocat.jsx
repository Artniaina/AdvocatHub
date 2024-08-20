import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../Hooks/AuthContext";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-user-menu-male-40.png";
import { fetchAvocatInfo } from "../../../../Store/AvocatSlice";

const Avocat = () => {
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(user.email));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

  const [name, setName] = useState(avocatInfo?.m_sNom || "");
  const [prenom, setPrenom] = useState(avocatInfo?.m_sPrenom || "");
  const [etude, setEtude] = useState("");
  const [adresseEtude, setAdresseEtude] = useState(
    avocatInfo?.m_sAdresseEtude || ""
  );
  const [dateAssermentation, setDateAssermentation] = useState(
    avocatInfo?.m_dDateAssermentation || ""
  );
  const [telephone, setTelephone] = useState(avocatInfo?.m_stelephonetri || "");
  const [email, setEmail] = useState(avocatInfo?.m_emailbarreau || "");
  useEffect(() => {
    if (avocatInfo) {
      setName(avocatInfo.m_sNom);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
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
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" value={name} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" value={prenom} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude:</label>
          <input type="text" id="etude" value={etude} readOnly />
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
          <input type="checkbox" id="societe" name="societe" value="societe" />
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
