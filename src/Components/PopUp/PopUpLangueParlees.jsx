import React, { useRef, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import "../../Styles/PopUp/LangueParlees.css";

const languages = [
  { code: "ab", name: "Abkhazian" },
  { code: "aa", name: "Afar" },
  { code: "af", name: "Afrikaans" },
  { code: "ak", name: "Akan" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "an", name: "Aragonese" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avaric" },
  { code: "ae", name: "Avestan" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "bm", name: "Bambara" },
  { code: "ba", name: "Bashkir" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bh", name: "Bihari" },
  { code: "bi", name: "Bislama" },
  { code: "bs", name: "Bosnian" },
  { code: "br", name: "Breton" },
  { code: "bg", name: "Bulgarian" },
  { code: "my", name: "Burmese" },
  { code: "ca", name: "Catalan" },
  { code: "ch", name: "Chamorro" },
  { code: "ce", name: "Chechen" },
  { code: "ny", name: "Chichewa" },
  { code: "zh", name: "Chinese" },
  { code: "cv", name: "Chuvash" },
  { code: "kw", name: "Cornish" },
  { code: "co", name: "Corsican" },
  { code: "cr", name: "Cree" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "dv", name: "Divehi" },
  { code: "nl", name: "Dutch" },
  { code: "dz", name: "Dzongkha" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "fo", name: "Faroese" },
  { code: "fj", name: "Fijian" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "ff", name: "Fulah" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian" },
  { code: "ha", name: "Hausa" },
  { code: "he", name: "Hebrew" },
  { code: "hz", name: "Herero" },
  { code: "hi", name: "Hindi" },
  { code: "ho", name: "Hiri Motu" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "io", name: "Ido" },
  { code: "ig", name: "Igbo" },
  { code: "id", name: "Indonesian" },
  { code: "ia", name: "Interlingua" },
  { code: "ie", name: "Interlingue" },
  { code: "iu", name: "Inuktitut" },
  { code: "ik", name: "Inupiaq" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jv", name: "Javanese" },
  { code: "kl", name: "Kalaallisut" },
  { code: "kn", name: "Kannada" },
  { code: "kr", name: "Kanuri" },
  { code: "ks", name: "Kashmiri" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "ki", name: "Kikuyu" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "ky", name: "Kirghiz" },
  { code: "kv", name: "Komi" },
  { code: "kg", name: "Kongo" },
  { code: "ko", name: "Korean" },
  { code: "ku", name: "Kurdish" },
  { code: "kj", name: "Kwanyama" },
  { code: "la", name: "Latin" },
  { code: "lb", name: "Luxembourgish" },
  { code: "lg", name: "Luganda" },
  { code: "li", name: "Limburgish" },
  { code: "ln", name: "Lingala" },
  { code: "lo", name: "Lao" },
  { code: "lt", name: "Lithuanian" },
  { code: "lu", name: "Luba-Katanga" },
  { code: "lv", name: "Latvian" },
  { code: "gv", name: "Manx" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mh", name: "Marshallese" },
  { code: "mn", name: "Mongolian" },
  { code: "na", name: "Nauru" },
  { code: "nv", name: "Navajo" },
  { code: "nd", name: "North Ndebele" },
  { code: "nr", name: "South Ndebele" },
  { code: "ng", name: "Ndonga" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "nb", name: "Norwegian Bokmål" },
  { code: "nn", name: "Norwegian Nynorsk" },
  { code: "ii", name: "Sichuan Yi" },
  { code: "oc", name: "Occitan" },
  { code: "oj", name: "Ojibwa" },
  { code: "cu", name: "Old Church Slavonic" },
  { code: "om", name: "Oromo" },
  { code: "or", name: "Oriya" },
  { code: "os", name: "Ossetian" },
  { code: "pa", name: "Panjabi" },
  { code: "pi", name: "Pali" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "ps", name: "Pashto" },
  { code: "pt", name: "Portuguese" },
  { code: "qu", name: "Quechua" },
  { code: "rm", name: "Romansh" },
  { code: "rn", name: "Rundi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sa", name: "Sanskrit" },
  { code: "sc", name: "Sardinian" },
  { code: "sd", name: "Sindhi" },
  { code: "se", name: "Northern Sami" },
  { code: "sm", name: "Samoan" },
  { code: "sg", name: "Sango" },
  { code: "sr", name: "Serbian" },
  { code: "gd", name: "Gaelic" },
  { code: "sn", name: "Shona" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "st", name: "Southern Sotho" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "ss", name: "Swati" },
  { code: "sv", name: "Swedish" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "tg", name: "Tajik" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "bo", name: "Tibetan" },
  { code: "tk", name: "Turkmen" },
  { code: "tl", name: "Tagalog" },
  { code: "tn", name: "Tswana" },
  { code: "to", name: "Tonga" },
  { code: "tr", name: "Turkish" },
  { code: "ts", name: "Tsonga" },
  { code: "tt", name: "Tatar" },
  { code: "tw", name: "Twi" },
  { code: "ty", name: "Tahitian" },
  { code: "ug", name: "Uighur" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vi", name: "Vietnamese" },
  { code: "vo", name: "Volapük" },
  { code: "wa", name: "Walloon" },
  { code: "cy", name: "Welsh" },
  { code: "wo", name: "Wolof" },
  { code: "fy", name: "Western Frisian" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "za", name: "Zhuang" },
  { code: "zu", name: "Zulu" },
];

const LangueParlees = ({ onClose, onSubmit, value }) => {
  const overlayRef = useRef(null);
  const [sortedLanguages, setSortedLanguages] = useState(languages);
  const [sortOrder, setSortOrder] = useState("az");
  const [langue, setLangue] = useState(value || "");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchQueryCode, setSearchQueryCode] = useState("");
  const [searchQueryLangue, setSearchQueryLangue] = useState("");
  const [searchType, setSearchType] = useState("");

  const sortLanguages = () => {
    const newSortOrder = sortOrder === "az" ? "za" : "az";
    setSortOrder(newSortOrder);

    const sorted = languages.sort((a, b) => {
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
    onSubmit(selectedLanguages); 
    onClose();
  };

  const handleCheckboxChange = (code) => {
    setSelectedLanguages((prevSelectedLanguages) =>
      prevSelectedLanguages.includes(code)
        ? prevSelectedLanguages.filter((lang) => lang !== code)
        : [...prevSelectedLanguages, code]
    );
  };

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

export default LangueParlees;
