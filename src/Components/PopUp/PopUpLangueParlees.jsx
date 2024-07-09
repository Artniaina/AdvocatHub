import React, { useRef, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import "../../Styles/PopUp/LangueParlees.css";

const PopUpLangueParlees = ({
  onClose,
  onSubmit,
  value,
  languages,
  defaultLangue,
}) => {
  const langDefault = defaultLangue;
  const addValue = value;
  const TabAllLangues = [...langDefault, ...addValue];
  console.log(TabAllLangues);
  
  const overlayRef = useRef(null);
  const [sortedLanguages, setSortedLanguages] = useState(languages);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchQueryCode, setSearchQueryCode] = useState("");
  const [searchQueryLangue, setSearchQueryLangue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState(TabAllLangues);

  const sortLanguages = () => {
    const newSortOrder = sortOrder === "az" ? "za" : "az";
    setSortOrder(newSortOrder);

    const sorted = [...languages].sort((a, b) => {
      if (newSortOrder === "az") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedLanguages(sorted);
  };

  const handleSearchCodeChange = (e) => {
    setSearchQueryCode(e.target.value);
  };

  const handleSearchLangueChange = (e) => {
    setSearchQueryLangue(e.target.value);
  };

  const toggleSearchInput = (type) => {
    if (type === "code") {
      setSearchType("code");
      setSearchQueryLangue("");
    } else if (type === "langue") {
      setSearchType("langue");
      setSearchQueryCode("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = () => {
    const uniqueSelectedLanguages = Array.from(new Set(selectedLanguages));
    onSubmit(uniqueSelectedLanguages);
    onClose();
  };

  const handleCheckboxChange = (code) => {
    setSelectedLanguages((prevSelectedLanguages) => {
      const isSelected = prevSelectedLanguages.includes(code);
      if (isSelected) {
        return prevSelectedLanguages.filter((lang) => lang !== code);
      } else {
        return [...prevSelectedLanguages, code];
      }
    });
  };
  
  console.log(selectedLanguages);

  const filteredLanguages = sortedLanguages.filter((language) => {
    if (searchType === "code") {
      return language.code
        .toLowerCase()
        .includes(searchQueryCode.toLowerCase());
    } else if (searchType === "langue") {
      return language.name
        .toLowerCase()
        .includes(searchQueryLangue.toLowerCase());
    } else {
      return (
        language.code.toLowerCase().includes(searchQueryCode.toLowerCase()) ||
        language.name.toLowerCase().includes(searchQueryLangue.toLowerCase())
      );
    }
  });

  return (
    <div className="popup-overlay" ref={overlayRef}>
      <div className="popup-content">
        <div className="head">
          <button className="closebtn" onClick={onClose}>
            <SlClose />
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  {searchType === "code" ? (
                    <input
                      type="text"
                      placeholder="Code"
                      value={searchQueryCode}
                      onChange={handleSearchCodeChange}
                    />
                  ) : (
                    <>
                      <button onClick={() => toggleSearchInput("code")}>
                        <CiSearch />
                      </button>
                      <button className="theadbtn" onClick={sortLanguages}>
                        {sortOrder === "az" ? "Code ▲" : "Code ▼"}
                      </button>
                    </>
                  )}
                </th>
                <th>
                  {searchType === "langue" ? (
                    <input
                      type="text"
                      placeholder="Langue"
                      value={searchQueryLangue}
                      onChange={handleSearchLangueChange}
                    />
                  ) : (
                    <>
                      <button onClick={() => toggleSearchInput("langue")}>
                        <CiSearch />
                      </button>
                      <button className="theadbtn" onClick={sortLanguages}>
                        {sortOrder === "az" ? "Langue ▲" : "Langue ▼"}
                      </button>
                    </>
                  )}
                </th>
                <th className="theadbtn">Choix</th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((language) => (
                <tr key={language.code}>
                  <td>{language.code}</td>
                  <td>{language.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={language.code}
                      checked={selectedLanguages.includes(language.code)}
                      onChange={() => handleCheckboxChange(language.code)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="buttonPop" onClick={handleSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default PopUpLangueParlees;
