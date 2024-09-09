import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const PopupProvision = ({ onClose, onSubmit }) => {
  const initialData = Array.from({ length: 5 }, () => ({
    date: "",
    reference: "",
    amount: "",
    paye: "non",
  }));
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [rowsData, setRowsData] = useState(initialData);
  const [initialRowsData, setInitialRowsData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  useEffect(() => {
    setInitialRowsData(rowsData);
  }, []);

  const checkIfModified = () => {
    return rowsData.some((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.date !== initialRow.date ||
        row.reference !== initialRow.reference ||
        row.amount !== initialRow.amount ||
        row.paye !== initialRow.paye
      );
    });
  };

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [rowsData]);

  const handleInputChange = (index, field, value) => {
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleToggle = (index, value) => {
    setRowsData((prevState) =>
      prevState.map((row, i) => (i === index ? { ...row, paye: value } : row))
    );
  };

  const handleReset = (index) => {
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { date: "", reference: "", amount: "", paye: "non" } : row
      )
    );
  };
  const getModifiedData = () => {
    return rowsData.filter((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.date !== initialRow.date ||
        row.reference !== initialRow.reference ||
        row.amount !== initialRow.amount ||
        row.paye !== initialRow.paye
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedData = getModifiedData();
    onSubmit(modifiedData);
    console.log(modifiedData);
    onClose();
  };

  const rows = Array.from({ length: 5 });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="guide guide2">
        <p>
          {" "}
          Insérer date, référence et montant déjà ou pas payée <br /> <br />
          Cliquer sur le bouton “ Enregistrer” <span> Enregistrer </span>
        </p>
      </div>
      <div className="popupAffaire" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="closeButton">
          <IoCloseCircle />
        </button>
        <form onSubmit={handleSubmit}>
          <table className="domainTable">
            <thead>
              <tr>
                <th>Date*</th>
                <th>Référence</th>
                <th>Montant*</th>
                <th>Payée?</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      value={rowsData[index].date}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={rowsData[index].reference}
                      onChange={(e) =>
                        handleInputChange(index, "reference", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={rowsData[index].amount}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ display: "flex" }}>
                    <ToggleButton
                      name={`paye-${index}`}
                      checkedValue={rowsData[index].paye}
                      onChange={(value) => handleToggle(index, value)}
                    />
                    
                    <FormControlLabel
                      control={<Android12Switch defaultChecked />}
                      label=""
                    />
                    <TiDelete
                      style={{
                        color: "red",
                        fontSize: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleReset(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="submitButton">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupProvision;
