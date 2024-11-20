import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import "../../Styles/Authentification/Log.css";
import Img from "../../assets/reg.png";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      alert("Tous les champs doivent être remplis.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et peut contenir d'autres caractères spéciaux."
      );
      return;
    }

    try {
      const formattedData = {
        sUsername: username,
        sAdresseEmail: email,
        sMotdePasse: password,
      };

      const response = await fetch(
        "http://192.168.10.10/Utilisateur/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

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
      setError("Erreur lors de la création du compte.");
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
          {error && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaRegUser className="icon" />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
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
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
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
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
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
        </div>
      </div>
    </div>
  );
};

export default Registration;
