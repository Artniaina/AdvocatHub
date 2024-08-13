import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { HiArrowSmallLeft } from "react-icons/hi2";
import ReCAPTCHA from "react-google-recaptcha";

const ModifMdp = ({email}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleGoBack=()=>{
    navigate(-1)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    } else if (!captchaValue) {
      alert("Veuillez cocher la case 'Je ne suis pas un robot'!");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (
      !passwordRegex.test(formData.password) &&
      formData.password &&
      formData.confirmPassword
    ) {
      alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et peut contenir d'autres caractères spéciaux.")
      return;
    }
   

    try {
      const formattedData = {
        SAdresseEmail: email,
        SMotdePasse: formData.password,
      };

      const response = await fetch("http://192.168.10.5/Utilisateur/Modif", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Échec lors du changement du mot de passe");
      }

      navigate("/");
    } catch (error) {
      alert("Échec lors du changement de mot de passe");
      console.error("Échec lors du changement de mot de passe :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const handleKeyDown = (e) => {
    const isCapsLockActive = e.getModifierState("CapsLock");
    setCapsLockActive(isCapsLockActive);
  };

  return (
    <div>
      <button onClick={handleGoBack} style={styles.buttongoback}>
        <HiArrowSmallLeft style={{ fontSize: 20 }} />
      </button>
      <h2 className="App">Nouveau mot de passe</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label htmlFor="email" className="label">
            Adresse email :
          </label>
          <br />
          <input
            id="email"
            className="input"
            type="email"
            name="email"
            value={email}
            readOnly
          />
        </div>
        <div
          style={{
            position: "relative",
            left: 12,
          }}
        >
          <label htmlFor="password" className="label">
            Nouveau mot de passe:
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
        <div
          style={{
            position: "relative",
            left: 12,
          }}
        >
          <label htmlFor="confirmPassword" className="label">
            Confirmation mot de passe:
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
            <span
              className="tooglePassword"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <ReCAPTCHA
            sitekey="6LdoI58pAAAAAA16dmiIJYPPd1LxM_D0esNeIudx"
            onChange={handleCaptchaChange}
            style={{ margin: 20, marginLeft: "2" }}
          />
        </div>
        <button className="button" type="submit">
          Modifier
        </button>
      </form>
    </div>
  );
};

const styles={
  buttongoback: {
    backgroundColor: "#73A9AD",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    marginTop: -20,
    position: "absolute",
    top: 50,
    height: 50,
  },
}
export default ModifMdp;
