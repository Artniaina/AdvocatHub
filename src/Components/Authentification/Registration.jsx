import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        <>
          <IoWarningOutline
            style={{
              fontSize: 40,
              position: "absolute",
              top: 145,
            }}
          />
          Le mot de passe doit contenir au moins 8 caractères, une majuscule,
          une minuscule, un chiffre et peut contenir d'autres caractères
          spéciaux.
        </>
      );
      return;
    }

    try {
      const formattedData = {
        sUsername: formData.username,
        sAdresseEmail: formData.email,
        sMotdePasse: formData.password,
      };

      const response = await fetch("http://192.168.10.5/Utilisateur/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du compte.");
      }

      console.log(
        `Compte créé avec succès, data: nom: ${formData.username}, email: ${formData.email} et mot de passe ${formData.password}`
      );
      navigate("/");
      setFormData({
        username: "",
        email: "",
        password: "",
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

  const handleKeyDown = (e) => {
    const isCapsLockActive = e.getModifierState("CapsLock");
    setCapsLockActive(isCapsLockActive);
  };

  return (
    <div>
      <h2 className="App"><FaRegUser />Sign up</h2>
      {error && (
        <p
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 15,
            width: 500,
            marginLeft: -25,
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label htmlFor="username" className="label">
            Username:
          </label>
          <br />
          <input
            id="username"
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <br />
          <input
            id="email"
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            position: "relative",
            left: 12,
          }}
        >
          <label htmlFor="password" className="label">
            Password:
          </label>
          <br />
          <div className="passwordInputContainer">
            <input
              id="password"
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
             
            />
            <span className="tooglePassword" onClick={togglePasswordVisibility}>
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {capsLockActive && (
            <RiErrorWarningFill
              style={{
                color: "orange",
                position: "absolute",
                left: "300px",
                top: "9px",
              }}
            />
          )}
        </div>
        <button className="button" type="submit">
          Créer
        </button>
        <p>
          <Link className="link" to="/">
            Vous avez déjà un compte ?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
