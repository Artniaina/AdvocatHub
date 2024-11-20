import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import "../../Styles/Authentification/Form.css";
import { useAuth } from "../../Hooks/AuthContext";
import "../../Styles/Authentification/Log.css";
import Img from "../../assets/reg.png";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { setIsSimpleAuthenticated, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [totpKey, setTotpKey] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    if (!captchaValue) {
      alert("Veuillez cocher la case 'Je ne suis pas un robot'.");
      return;
    }
    try { 
      const userData = {
        sAdresseEmail: email,
        sMotdePasse: password,
        sCodeOTP: false,
      };
      const response = await fetch("http://192.168.10.10/Utilisateur/Authent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.smessage === "OK") {
          setIsSimpleAuthenticated(true);
          const totpKey = data.scléTOTP;
          const url = data.sUrl;
          const role = data.sRole;
          setTotpKey(totpKey);
          setUrl(url);

          const user = {
            email: userData.sAdresseEmail,
            role: role,
          };

          login(totpKey, user);

          const storedIsAlreadyAuthenticated = data.sVerify


          if (storedIsAlreadyAuthenticated) {
            navigate("/validationotp", {
              state: { url, email, role, password },
            });
          } else {
            navigate("/scanqrcode", {
              state: { url, email, role, password },
            });
          }
        } else {
          alert("Email ou mot de passe incorrect");
        }
      } else {
        alert("Email ou mot de passe incorrect");
      }
    } catch (error) {
      alert("Email ou mot de passe incorrect");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordKeyDown = (e) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <div className="login-left">
        <h2 style={{textAlign:"center"}}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <MdOutlineEmail className="icon" />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <RiLockPasswordLine className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          
          <Link className="forgot-password" to="/verifemail">
            Mot de passe oublié ?
          </Link>
          <div className="flex">

          <ReCAPTCHA
            sitekey="6LdoI58pAAAAAA16dmiIJYPPd1LxM_D0esNeIudx"
            onChange={handleCaptchaChange}
            style={{ margin: "20px 0" }}
          />
          <button type="submit" className="login-btn">
            Se connecter
          </button>
          <p>
            Pas encore de compte ?{" "}
            <Link className="register-link" to="/registration">
              Créer un compte
            </Link>
          </p>
          </div>
        </form>
      </div>
      <div className="login-right">
        <img src={Img} alt="Illustration de connexion" />
      </div>
    </div>
  </div>
  );
};

export default Login;