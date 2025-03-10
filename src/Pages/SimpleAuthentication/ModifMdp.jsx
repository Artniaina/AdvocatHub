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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); 

  const apiUrl = process.env.REACT_APP_API_URL;
  const Modal = ({ message, onClose, type }) => {
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={{ color: type === "error" ? "#ff4d4f" : "#5E1675" }}>
            {type === "error" ? "Erreur" : "Succès"}
          </h3>
          <p>{message}</p>
          <button onClick={onClose} style={styles.modalButton}>
            Fermer
          </button>
        </div>
      </div>
    );
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalMessage("Les mots de passe ne correspondent pas.");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    if (!formData.password) {
      setModalMessage("Veuillez remplir tout les champs");
      setModalType("error");
      setModalVisible(true);
      return;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formData.password)
    ) {
      setModalMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.");
      setModalType("error");
      setModalVisible(true);
      return;
    }
    if (!captchaValue) {
      setModalMessage("Veuillez cocher la case\"Je ne suis pas un robot\"");
      setModalType("error");
      setModalVisible(true);
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/Utilisateur/Modif`, {
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
      setModalMessage("Mot de passe changé avec succès !");
      setModalType("success");
      setModalVisible(true);
      navigate("/");
    } catch (error) {
      setModalMessage("Une erreur est survenue, veuillez réessayer.");
      setModalType("error");
      setModalVisible(true);
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div style={styles.container}>
      {modalVisible && (
        <Modal message={modalMessage} onClose={handleModalClose} type={modalType} />
      )}
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
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    width: "300px",
  },
  modalButton: {
    padding: "10px 15px",
    backgroundColor: "#5E1675",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
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
    padding: "10px 30px",
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
  captchaContainer: {
    marginBottom: "15px",
  },
  submitButton: {
    backgroundColor: "#5E1675",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  goBackButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default ModifMdp;
