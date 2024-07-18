import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import "../../Styles/Authentification/Form.css";
import { useCookies } from "react-cookie";
import { useAuth } from "../../Hooks/AuthContext";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const { setIsSimpleAuthenticated } = useAuth();
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
    if (!captchaValue) {
      alert("Veuillez cocher la case 'Je ne suis pas un robot'.");
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
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.smessage === "OK") {
          setIsSimpleAuthenticated(true);
          const totpKey = data.scléTOTP;
          const url = data.sUrl;
          const email = userData.sAdresseEmail;
          const password = userData.sMotdePasse;
          const role = data.sRole;
          setTotpKey(totpKey);
          setUrl(url);
          const storedIsAlreadyAuthenticated = localStorage.getItem(
            `user:${email}:isAlreadyAuthenticated`
          );

          if (storedIsAlreadyAuthenticated) {
            navigate("/validationotp", {
              state: { url, email, role, password },
            });
          } else {
            navigate("/scanqrcode", {
              state: { url, email, role, password },
            });
          }

          function parseCookies() {
            return document.cookie.split(";").reduce((cookies, cookie) => {
              const [name, value] = cookie.trim().split("=");
              cookies[name] = decodeURIComponent(value);
              return cookies;
            }, {});
          }

          const cookiees = parseCookies();
          console.log(cookiees);

          console.log("Response :", response);
          console.log("Response Headers:", response.headers);
          console.log("Response Headers:", response.headers.get("set-cookie"));

          const cookies = new Cookies();
          const cookieValue = cookies.get("COOKIE_SESSION");
          if (cookieValue) {
            console.log("Contenu du cookie COOKIE_SESSION :", cookieValue);
          } else {
            console.log("Le cookie COOKIE_SESSION n'existe pas ou est vide.");
          }

          const cookieHeaderValue = response.headers.get("set-cookie");
          const cookieHeadcerValue = response.cookies;
          console.log(cookieHeadcerValue);
          const hello = response.headers.get("access-control-allow-headers");
          console.log(hello);
          if (cookieHeaderValue) {
            const match = cookieHeaderValue.match(
              /([^=]+)=([^;]+); expires=([^;]+)/
            );
            if (match && match.length === 4) {
              const cookieName = match[1];
              const cookieValue = match[2];
              const expirationDateString = match[3];
              const expirationDate = new Date(expirationDateString);
              cookies.set(cookieName, cookieValue, {
                path: "/",
                expires: expirationDate,
                sameSite: "Lax",
              });
              console.log(
                `Cookie ${cookieName} ${cookieValue} ${expirationDate} ${expirationDateString} set with expiration and samesite.`
              );
            } else {
              console.log(
                "Nom ou valeur du cookie non trouvé dans la réponse."
              );
            }
          } else {
            console.log("Cookie header non trouvé dans la réponse.");
          }
        } else {
          setErrorMessage("Email ou mot de passe incorrect");
        }
      } else {
        setErrorMessage("Email ou mot de passe incorrect");
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
