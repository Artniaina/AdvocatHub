import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import "../Styles/Authentification/Form.css";
import { useCookies } from "react-cookie";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [totpKey, setTotpKey] = useState("");
  const [url, setUrl] = useState("");
  const [cookies, setCookie] = useCookies(["COOKIE_SESSION"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const userData = {
        sAdresseEmail: email,
        sMotdePasse: password,
      };
      const response = await fetch("http://192.168.10.5/Utilisateur/Authent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //Need Access-Control-Allow-Credentials: true
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.smessage === "OK") {
          const totpKey = data.scléTOTP;
          setIsAuthenticated(true);

          const url = data.sUrl;
          const email = userData.sAdresseEmail;
          const role = data.sRole;
          setTotpKey(totpKey);
          setUrl(url);
          const storedIsAlreadyAuthenticated = localStorage.getItem(
            `user:${email}:isAlreadyAuthenticated`
          );
          if (storedIsAlreadyAuthenticated) {
            navigate("/validationotp", {
              state: { url, email, role, isAuthenticated: true },
            });
          } else {
            navigate("/DoubleAuth", {
              state: { url, email, role, isAuthenticated: true },
            });
          }

          const cookieHeaderValue = response.headers.get("Set-Cookie");
          if (cookieHeaderValue) {
            const match = cookieHeaderValue.match(/([^=]+)=([^;]+)/);
            if (match && match.length === 3) {
              const cookieName = match[1];
              const cookieValue = match[2];
              setCookie(cookieName, cookieValue, { path: "/" });
            } else {
              console.log("Nom ou valeur du cookie non trouvé dans la réponse.");
            }
          } else {
            console.log("Cookie header non trouvé dans la réponse.");
          }
        } else {
          console.log("Email ou mot de passe incorrect");
          setErrorMessage("Email ou mot de passe incorrect");
        }
      } else {
        console.log("Email ou mot de passe incorrect");
        setErrorMessage("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Email ou mot de passe incorrect");
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
    <div className="headerAuthent">
      <h2 className="AppAuthent">Login</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label className="label"> Email:</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdOutlineEmail
            style={{ position: "absolute", top: 65, right: 50, fontSize: 30 }}
          />
        </div>
        <div style={{ position: "relative", left: 12 }}>
          <label className="label">Mot de passe:</label>
          {capsLockOn && (
            <RiErrorWarningFill
              style={{
                color: "orange",
                position: "absolute",
                left: "300px",
                top: "9px",
              }}
            />
          )}
          <br />
          <div className="passwordInputContainer">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyDown}
            />
            <span
              type="button"
              onClick={togglePasswordVisibility}
              className="tooglePassword"
            >
              {showPassword ? (
                <BsEyeSlash style={{ fontSize: 30 }} />
              ) : (
                <BsEye style={{ fontSize: 30 }} />
              )}
            </span>
          </div>
          <Link
            className="link"
            to="/verifemail"
            style={{ position: "relative", left: 180 }}
          >
            <RiLockPasswordLine />
            Mot de passe oublié?
          </Link>
        </div>
        <ReCAPTCHA
          sitekey="6LdoI58pAAAAAA16dmiIJYPPd1LxM_D0esNeIudx"
          onChange={handleCaptchaChange}
          style={{ margin: 25 }}
        />
        <button className="button" type="submit">
          Login
        </button>
        <p>
          <Link className="link" to="/registration">
            Pas encore de compte? Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
