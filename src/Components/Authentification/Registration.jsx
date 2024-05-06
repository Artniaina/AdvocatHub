import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
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
        sUsername: username,
        sAdresseEmail: email,
        sMotdePasse: password,
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
        `Compte créé avec succès, data: nom: ${username}, email: ${email} et mot de passe ${password}`
      );
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
    <div>
      <h2 className="App">
        <FaRegUser />
        Sign in
      </h2>
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
          <FaRegUser/>
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
          <MdMailOutline />
        </div>
        <div>
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
            <span className="togglePassword" onClick={togglePasswordVisibility}>
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
        <div>
          <label htmlFor="confirmPassword" className="label">
            Confirm Password:
          </label>
          <br />
          <div className="passwordInputContainer">
            <input
              id="confirmPassword"
              className="input"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <span className="togglePassword" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
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
