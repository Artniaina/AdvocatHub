import React from "react";

const ToggleButton = ({ name, label, value, checkedValue, onChange }) => {
  return (
    <div className="box">
      <label
        className={`toggleButtonForm ${checkedValue === "non" ? "active" : ""}`}
      >
        <input
          type="radio"
          name={name}
          value="non"
          checked={checkedValue === "non"}
          onChange={() => onChange("non")}
        />
        Non
      </label>
      <label
        className={`toggleButtonForm ${checkedValue === "oui" ? "active" : ""}`}
      >
        <input
          type="radio"
          name={name}
          value="oui"
          checked={checkedValue === "oui"}
          onChange={() => onChange("oui")}
        />
        Oui
      </label>
    </div>
  );
};

export default ToggleButton;
