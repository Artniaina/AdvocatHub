import React from "react";
import { AlertTriangle, Home } from "lucide-react";
import "../Styles/PageNotFound.css";

const Page404 = () => {
  return (
    <div className="page-404-container">
      <div className="page-404-error-wrapper">
        <div className="error-code">
          <span className="digit-4">4</span>
          <AlertTriangle className="error-icon pulse-icon" />
          <span className="digit-4">4</span>
        </div>

        <h1 className="error-title">Page Introuvable</h1>

        <p className="error-message">
          La page que vous recherchez a disparu dans les méandres du web. Ne
          vous inquiétez pas, nous allons vous guider.
        </p>

        <div
          className="error-actions"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="back-home-btn"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="btn-icon rotate-hover" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
