import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs"; 
import ReCAPTCHA from "react-google-recaptcha";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
const ModifMdp = ({ email }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.password) {
      errors.password = "Le mot de passe est requis.";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !captchaValue) return;

    try {
      const response = await fetch("http://192.168.10.10/Utilisateur/Modif", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SAdresseEmail: email,
          SMotdePasse: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec lors du changement du mot de passe");
      }
      alert("Mot de passe changé avec succès !");
      navigate("/");
    } catch (error) {
      alert("Une erreur est survenue, veuillez réessayer.");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={handleGoBack} style={styles.goBackButton}>
            <HiArrowSmallLeft style={{ fontSize: 20 }} />
      </button>
      <div style={styles.card}>
        <h2 style={styles.title}>Nouveau mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Adresse email :
            </label>
            <div style={styles.inputWithIcon}>
              <MdOutlineEmail style={styles.lockIcon} />
              <input
                type="email"
                id="email"
                value={email}
                readOnly
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Nouveau mot de passe :
            </label>
            <div style={styles.passwordContainer}>
              <RiLockPasswordLine style={styles.lockIcon} /> 
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.icon}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />} 
              </span>
            </div>
            {errors.password && (
              <p style={styles.errorText}>{errors.password}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirmation mot de passe :
            </label>
            <div style={styles.passwordContainer}>
              <RiLockPasswordLine style={styles.lockIcon} /> 
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.icon}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />} 
              </span>
            </div>
            {errors.confirmPassword && (
              <p style={styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          <div style={styles.captchaContainer}>
            <ReCAPTCHA
              sitekey="6LdoI58pAAAAAA16dmiIJYPPd1LxM_D0esNeIudx"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // position: "relative",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    display: "block",
    marginBottom: "5px",
  },
  inputWithIcon: {
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    color: "#aaa",
  },
  icon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    color: "#aaa",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px 30px", // Added padding for the icons
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  passwordContainer: {
    position: "relative",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: "12px",
    marginTop: "5px",
  },
  captchaContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0",
  },
  submitButton: {
    width: "70%",
    padding: "12px",
    backgroundColor: "#5E1675",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s",
    margin: "auto 50px",
  },
  goBackButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#5E1675",
  
  },
};

export default ModifMdp;
