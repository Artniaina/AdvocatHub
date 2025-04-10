import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "../../Styles/Authentification/Log.css";
import Img from "../../assets/reg.png";
import GestionErreurPopUp from "../../Components/PopUp/GestionErreurPopUp";
import { TfiRulerAlt } from "react-icons/tfi";

const apiUrl = process.env.REACT_APP_API_URL;

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessageErreur("Tous les champs doivent être remplis.");
      setShowPopup(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessageErreur("Les mots de passe ne correspondent pas.");
      setShowPopup(true);
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessageErreur(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et peut contenir d'autres caractères spéciaux."
      );
      setShowPopup(true);
      return;
    }

    try {
      const formattedData = {
        sUsername: username,
        sAdresseEmail: email,
        sMotdePasse: password,
      };

      const response = await fetch(`${apiUrl}/Utilisateur/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du compte.");
      }
      navigate("/");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
    } catch (error) {
      setMessageErreur("Erreur lors de la création du compte.");
      setShowPopup(true);
      console.error("Erreur lors de la création du compte :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeyDown = (e) => {
    const isCapsLockActive = e.getModifierState("CapsLock");
    setCapsLockActive(isCapsLockActive);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-right">
          <img src={Img} alt="Registration Illustration" />
        </div>
        <div className="login-left">
          <h2 style={{ textAlign: "center" }}>Sign up</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaRegUser className="icon" />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Nom"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <MdMailOutline className="icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <RiLockPasswordLine className="icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
            <div className="input-group">
              <RiLockPasswordLine className="icon" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmation de mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
            <div className="flex">
              <ReCAPTCHA
                sitekey="6LdoI58pAAAAAA16dmiIJYPPd1LxM_D0esNeIudx"
                onChange={handleCaptchaChange}
                style={{ margin: "20px 0" }}
              />
              <button type="submit" className="login-btn">
                Créer
              </button>
              <p>
                <Link className="register-link" to="/">
                  Vous avez déjà un compte ?
                </Link>
              </p>
            </div>
          </form>
          {showPopup && (
            <GestionErreurPopUp
              messageErreur={messageErreur}
              closePopup={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
