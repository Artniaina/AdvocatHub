import React, { useEffect, useState } from "react";
import EtudeIcon from "../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../assets/icons8-contrat-de-travail-100(1).png";
import { FaFilePen } from "react-icons/fa6";
import "../../Styles/Homepage/Acceuil/Acceuil.css";
import "../../Styles/Homepage/Acceuil/PopUp.css";
import PopUpAdressePrivee from "../PopUp/PopUpAdressePrivee";
import { BsPlusCircleFill } from "react-icons/bs";
import PopUpLangueParlees from "../PopUp/PopUpLangueParlees";
import PopUpActiPref from "../PopUp/PopUpActivPref";
import "../../Styles/PopUp/AdressePriveePopUp.css";

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

const ModifFicheAvocat = ({ avocatInfo, etudeInfo }) => {
  const [selectedCountry, setSelectedCountry] = useState("+261");
  const [adresse, setAdresse] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguePopup, setShowLanguePopup] = useState(false);

  const handleLangueClick = () => {
    setShowLanguePopup(true);
  };

  const closeLanguePopup = () => {
    setShowLanguePopup(false);
  };

  const handleSubmitLangues = (selected) => {
    setSelectedLanguages(selected);
    setShowLanguePopup(false);
  };

  const handleAdresseSubmit = (adressePrivee) => {
    setAdresse(adressePrivee);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handleCountryCodeChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    const numberWithoutCountryCode = input.replace(selectedCountry, "").trim();
    const number = numberWithoutCountryCode.replace(/[^\d]/g, "");
    setPhoneNumber(number);
  };

  const formatPhoneNumber = (number) => {
    return number.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  };

  const langues =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];
  const activites =
    avocatInfo && avocatInfo.m_langue
      ? avocatInfo.m_sactivitépref.split(",")
      : [];
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);

  const handleDocumentClick = () => {
    setShowDocumentPopup(true);
  };

  const closeDocumentPopup = () => {
    setShowDocumentPopup(false);
  };
  const handleActiviteClick = () => {
    setShowActivPrefPopup(true);
  };

  const closeActivitePopup = () => {
    setShowActivPrefPopup(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    } else if (dateString.length === 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } else {
      return "Format de date inconnu";
    }
  };

  const aj = avocatInfo && avocatInfo.m_dispenseaj;
  const [isDispensed, setIsDispensed] = useState(aj);
  useEffect(() => {
    setIsDispensed(aj);
  }, [avocatInfo]);

  const handleSubmit = (selectedLanguage) => {
    setSelectedLanguages([...selectedLanguages, selectedLanguage]);
    setShowLanguePopup(false);
    console.log(selectedLanguage);
  };

  return (
    <div className="mainContainer">
      <div className="container" style={{ marginLeft: "30px" }}>
        <img src={PersoIcon} alt="logo" className="logo" />
        <h1>
          Informations personnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo">
          <p>
            Nom:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sNom}</strong>
          </p>
          <p>
            Prénom:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sPrenom}</strong>
          </p>
          <div className="p">
            <div className="b1" style={{ marginLeft: -5 }}>
              <p>
                Genre:
                <br />
                <strong>{avocatInfo && avocatInfo.m_sSexe}</strong>
              </p>
            </div>
            <div className="b">
              <p>
                Nationalité:
                <br />
                <strong>{avocatInfo && avocatInfo.m_sNationalite}</strong>
              </p>
            </div>
          </div>
          <hr />
          <p>
            Date de naissance:
            <br />
            <strong>
              {avocatInfo && formatDate(avocatInfo.m_dDateNaissance)}{" "}
            </strong>
          </p>
          <hr />
          <p>
            Lieu de naissance:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sLieuNaissance}</strong>
          </p>
          <p style={{ height: "200px" }}>
            Adresse privée:
            <br />
            {adresse && <strong>{adresse}</strong>}
            <button className="btnpop" onClick={handleDocumentClick}>
              <FaFilePen />
            </button>
            {showDocumentPopup && (
              <PopUpAdressePrivee
                onClose={closeDocumentPopup}
                onSubmit={handleAdresseSubmit}
                value={adresse}
              />
            )}
          </p>

          <p>
            Téléphone mobile:
            <div className="p">
              <div>
                <select
                  name="pays"
                  value={selectedCountry}
                  onChange={handleCountryCodeChange}
                >
                  <option value="+355">Albanie (+355)</option>
                  <option value="+213">Algérie (+213)</option>
                  <option value="+376">Andorre (+376)</option>
                  <option value="+54">Argentine (+54)</option>
                  <option value="+374">Arménie (+374)</option>
                  <option value="+297">Aruba (+297)</option>
                  <option value="+61">Australie (+61)</option>
                  <option value="+43">Autriche (+43)</option>
                  <option value="+994">Azerbaïdjan (+994)</option>
                  <option value="+1 268">Antigua-et-Barbuda (+1 268)</option>
                  <option value="+1 242">Bahamas (+1 242)</option>
                  <option value="+973">Bahreïn (+973)</option>
                  <option value="+880">Bangladesh (+880)</option>
                  <option value="+1 246">Barbade (+1 246)</option>
                  <option value="+375">Biélorussie (+375)</option>
                  <option value="+32">Belgique (+32)</option>
                  <option value="+501">Belize (+501)</option>
                  <option value="+229">Bénin (+229)</option>
                  <option value="+975">Bhoutan (+975)</option>
                  <option value="+591">Bolivie (+591)</option>
                  <option value="+387">Bosnie-Herzégovine (+387)</option>
                  <option value="+267">Botswana (+267)</option>
                  <option value="+55">Brésil (+55)</option>
                  <option value="+673">Brunei (+673)</option>
                  <option value="+359">Bulgarie (+359)</option>
                  <option value="+226">Burkina Faso (+226)</option>
                  <option value="+257">Burundi (+257)</option>
                  <option value="+855">Cambodge (+855)</option>
                  <option value="+237">Cameroun (+237)</option>
                  <option value="+1">Canada (+1)</option>
                  <option value="+238">Cap-Vert (+238)</option>
                  <option value="+236">République centrafricaine (+236)</option>
                  <option value="+235">Tchad (+235)</option>
                  <option value="+56">Chili (+56)</option>
                  <option value="+86">Chine (+86)</option>
                  <option value="+357">Chypre (+357)</option>
                  <option value="+57">Colombie (+57)</option>
                  <option value="+269">Comores (+269)</option>
                  <option value="+506">Costa Rica (+506)</option>
                  <option value="+385">Croatie (+385)</option>
                  <option value="+53">Cuba (+53)</option>
                  <option value="+599">Curaçao (+599)</option>
                  <option value="+45">Danemark (+45)</option>
                  <option value="+253">Djibouti (+253)</option>
                  <option value="+1 767">Dominique (+1 767)</option>
                  <option value="+1">République dominicaine (+1)</option>
                  <option value="+670">Timor oriental (+670)</option>
                  <option value="+593">Équateur (+593)</option>
                  <option value="+20">Égypte (+20)</option>
                  <option value="+503">Salvador (+503)</option>
                  <option value="+291">Érythrée (+291)</option>
                  <option value="+372">Estonie (+372)</option>
                  <option value="+251">Éthiopie (+251)</option>
                  <option value="+679">Fidji (+679)</option>
                  <option value="+358">Finlande (+358)</option>
                  <option value="+33">France (+33)</option>
                  <option value="+241">Gabon (+241)</option>
                  <option value="+220">Gambie (+220)</option>
                  <option value="+995">Géorgie (+995)</option>
                  <option value="+49">Allemagne (+49)</option>
                  <option value="+233">Ghana (+233)</option>
                  <option value="+350">Gibraltar (+350)</option>
                  <option value="+30">Grèce (+30)</option>
                  <option value="+299">Groenland (+299)</option>
                  <option value="+1 473">Grenade (+1 473)</option>
                  <option value="+502">Guatemala (+502)</option>
                  <option value="+224">Guinée (+224)</option>
                  <option value="+245">Guinée-Bissau (+245)</option>
                  <option value="+592">Guyana (+592)</option>
                  <option value="+509">Haïti (+509)</option>
                  <option value="+504">Honduras (+504)</option>
                  <option value="+852">Hong Kong (+852)</option>
                  <option value="+36">Hongrie (+36)</option>
                  <option value="+354">Islande (+354)</option>
                  <option value="+91">Inde (+91)</option>
                  <option value="+62">Indonésie (+62)</option>
                  <option value="+98">Iran (+98)</option>
                  <option value="+964">Irak (+964)</option>
                  <option value="+353">Irlande (+353)</option>
                  <option value="+44">Royaume-Uni (+44)</option>
                  <option value="+972">Israël (+972)</option>
                  <option value="+39">Italie (+39)</option>
                  <option value="+225">Côte d'Ivoire (+225)</option>
                  <option value="+1 876">Jamaïque (+1 876)</option>
                  <option value="+81">Japon (+81)</option>
                  <option value="+962">Jordanie (+962)</option>
                  <option value="+7">Kazakhstan (+7)</option>
                  <option value="+254">Kenya (+254)</option>
                  <option value="+686">Kiribati (+686)</option>
                  <option value="+965">Koweït (+965)</option>
                  <option value="+996">Kirghizistan (+996)</option>
                  <option value="+856">Laos (+856)</option>
                  <option value="+371">Lettonie (+371)</option>
                  <option value="+961">Liban (+961)</option>
                  <option value="+266">Lesotho (+266)</option>
                  <option value="+231">Liberia (+231)</option>
                  <option value="+218">Libye (+218)</option>
                  <option value="+423">Liechtenstein (+423)</option>
                  <option value="+370">Lituanie (+370)</option>
                  <option value="+352">Luxembourg (+352)</option>
                  <option value="+853">Macao (+853)</option>
                  <option value="+389">Macédoine du Nord (+389)</option>
                  <option value="+261">Madagascar (+261)</option>
                  <option value="+265">Malawi (+265)</option>
                  <option value="+60">Malaisie (+60)</option>
                  <option value="+960">Maldives (+960)</option>
                  <option value="+223">Mali (+223)</option>
                  <option value="+356">Malte (+356)</option>
                  <option value="+692">Îles Marshall (+692)</option>
                  <option value="+222">Mauritanie (+222)</option>
                  <option value="+230">Maurice (+230)</option>
                  <option value="+262">Mayotte (+262)</option>
                  <option value="+52">Mexique (+52)</option>
                  <option value="+691">
                    États fédérés de Micronésie (+691)
                  </option>
                  <option value="+373">Moldavie (+373)</option>
                  <option value="+377">Monaco (+377)</option>
                  <option value="+976">Mongolie (+976)</option>
                  <option value="+382">Monténégro (+382)</option>
                  <option value="+212">Maroc (+212)</option>
                  <option value="+258">Mozambique (+258)</option>
                  <option value="+264">Namibie (+264)</option>
                  <option value="+674">Nauru (+674)</option>
                  <option value="+977">Népal (+977)</option>
                  <option value="+31">Pays-Bas (+31)</option>
                  <option value="+687">Nouvelle-Calédonie (+687)</option>
                  <option value="+64">Nouvelle-Zélande (+64)</option>
                  <option value="+505">Nicaragua (+505)</option>
                  <option value="+227">Niger (+227)</option>
                  <option value="+234">Nigeria (+234)</option>
                  <option value="+683">Niue (+683)</option>
                  <option value="+47">Norvège (+47)</option>
                  <option value="+968">Oman (+968)</option>
                  <option value="+92">Pakistan (+92)</option>
                  <option value="+680">Palaos (+680)</option>
                  <option value="+970">Palestine (+970)</option>
                  <option value="+507">Panama (+507)</option>
                  <option value="+675">Papouasie-Nouvelle-Guinée (+675)</option>
                  <option value="+595">Paraguay (+595)</option>
                  <option value="+51">Pérou (+51)</option>
                  <option value="+63">Philippines (+63)</option>
                  <option value="+48">Pologne (+48)</option>
                  <option value="+351">Portugal (+351)</option>
                  <option value="+1 787">Porto Rico (+1 787)</option>
                  <option value="+974">Qatar (+974)</option>
                  <option value="+40">Roumanie (+40)</option>
                  <option value="+7">Russie (+7)</option>
                  <option value="+250">Rwanda (+250)</option>
                  <option value="+290">Sainte-Hélène (+290)</option>
                  <option value="+1 869">
                    Saint-Christophe-et-Niévès (+1 869)
                  </option>
                  <option value="+1 758">Sainte-Lucie (+1 758)</option>
                  <option value="+508">Saint-Pierre-et-Miquelon (+508)</option>
                  <option value="+1 784">
                    Saint-Vincent-et-les-Grenadines (+1 784)
                  </option>
                  <option value="+685">Samoa (+685)</option>
                  <option value="+378">Saint-Marin (+378)</option>
                  <option value="+239">Sao Tomé-et-Principe (+239)</option>
                  <option value="+966">Arabie saoudite (+966)</option>
                  <option value="+221">Sénégal (+221)</option>
                  <option value="+381">Serbie (+381)</option>
                  <option value="+248">Seychelles (+248)</option>
                  <option value="+232">Sierra Leone (+232)</option>
                  <option value="+65">Singapour (+65)</option>
                  <option value="+421">Slovaquie (+421)</option>
                  <option value="+386">Slovénie (+386)</option>
                  <option value="+677">Îles Salomon (+677)</option>
                  <option value="+252">Somalie (+252)</option>
                  <option value="+27">Afrique du Sud (+27)</option>
                  <option value="+211">Soudan du Sud (+211)</option>
                  <option value="+34">Espagne (+34)</option>
                  <option value="+94">Sri Lanka (+94)</option>
                  <option value="+249">Soudan (+249)</option>
                  <option value="+597">Suriname (+597)</option>
                  <option value="+268">Eswatini (+268)</option>
                  <option value="+46">Suède (+46)</option>
                  <option value="+41">Suisse (+41)</option>
                  <option value="+963">Syrie (+963)</option>
                  <option value="+886">Taïwan (+886)</option>
                  <option value="+992">Tadjikistan (+992)</option>
                  <option value="+255">Tanzanie (+255)</option>
                  <option value="+66">Thaïlande (+66)</option>
                  <option value="+670">Timor oriental (+670)</option>
                  <option value="+228">Togo (+228)</option>
                  <option value="+676">Tonga (+676)</option>
                  <option value="+1 868">Trinité-et-Tobago (+1 868)</option>
                  <option value="+216">Tunisie (+216)</option>
                  <option value="+90">Turquie (+90)</option>
                  <option value="+993">Turkménistan (+993)</option>
                  <option value="+688">Tuvalu (+688)</option>
                  <option value="+256">Ouganda (+256)</option>
                  <option value="+380">Ukraine (+380)</option>
                  <option value="+971">Émirats arabes unis (+971)</option>
                  <option value="+44">Royaume-Uni (+44)</option>
                  <option value="+1">États-Unis (+1)</option>
                  <option value="+598">Uruguay (+598)</option>
                  <option value="+998">Ouzbékistan (+998)</option>
                  <option value="+678">Vanuatu (+678)</option>
                  <option value="+379">Cité du Vatican (+379)</option>
                  <option value="+58">Venezuela (+58)</option>
                  <option value="+84">Vietnam (+84)</option>
                  <option value="+967">Yémen (+967)</option>
                  <option value="+260">Zambie (+260)</option>
                  <option value="+263">Zimbabwe (+263)</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  value={`${selectedCountry} ${formatPhoneNumber(phoneNumber)}`}
                  onChange={handlePhoneNumberChange}
                  placeholder="Numéro de téléphone"
                  className="modifInput"
                />
              </div>
            </div>
          </p>

          <p>
            E-mail privé:
            <input className="modifInput" type="text" />
          </p>
          <p>
            IBAN:
            <input
              className="modifInput"
              type="text"
              defaultValue={avocatInfo && avocatInfo.m_IBAN}
            />
          </p>
          <p>
            Code BIC:
            <input
              className="modifInput"
              type="text"
              defaultValue={avocatInfo && avocatInfo.m_BIC}
            />
          </p>
        </div>
      </div>

      <div className="container " style={{ width: "520px" }}>
        <img src={ProIcon} alt="logo" className="logo" />
        <h1>
          Informations professionnnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo middle">
          <p>
            Identifiant Interne:
            <br />
            <strong>{avocatInfo && avocatInfo.m_NumInterne}</strong>
          </p>
          <p>
            Liste:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sLibelleliste}</strong>
          </p>
          <p>
            E-mail barreau:
            <br />
            <strong>{avocatInfo && avocatInfo.m_emailbarreau}</strong>
          </p>
          <p>
            E-mail professionnel:
            <br />
            <input className="modifInput" type="text" />
          </p>
          <p>
            Date d'assermentation:
            <br />
            <strong>
              {avocatInfo && formatDate(avocatInfo.m_dDateAssermentation)}
            </strong>
          </p>
          <p>
            Date d'avoué:
            <br />
            <strong>{avocatInfo && formatDate(avocatInfo.m_dDateAvoue)}</strong>
          </p>

          <p>
            Langues parlées:
            <br />
            <span>
              {selectedLanguages.map((code, index) => {
                const language = languages.find((lang) => lang.code === code);
                return (
                  <React.Fragment key={index}>
                    <strong>{language ? language.name : code}</strong>
                    <br />
                  </React.Fragment>
                );
              })}
              <button onClick={handleLangueClick}>
                <BsPlusCircleFill />
              </button>
              {showLanguePopup && (
                <PopUpLangueParlees
                  onClose={closeLanguePopup}
                  onSubmit={handleSubmitLangues}
                  value={selectedLanguages}
                  languages={languages}
                />
              )}
            </span>
          </p>
          <p>
            Activités préférentielles:
            <br />
            <span>
              {activites.map((activites, index) => (
                <React.Fragment key={index}>
                  <strong>{activites}</strong>
                  <br />
                </React.Fragment>
              ))}
              <button onClick={handleActiviteClick}>
                <BsPlusCircleFill />
              </button>
              {showActivPrefPopup && (
                <PopUpActiPref onClose={closeActivitePopup} />
              )}
            </span>
          </p>

          <p>
            Assistance Judiciaire:
            <div className="bout">
              {aj == 1 ? (
                <>
                  <button className="boutonn oui">Oui</button>
                  <button className="boutonn non">Non</button>
                </>
              ) : (
                <>
                  <button className="boutonn non">Oui</button>
                  <button className="boutonn oui">Non</button>
                </>
              )}
            </div>
          </p>
        </div>
      </div>
      <div className="container" style={{ marginRight: "30px" }}>
        <img src={EtudeIcon} alt="logo" className="logo" />
        <h1>
          Etude <hr className="hr" />
        </h1>
        <div className="containerInfo">
          {etudeInfo && (
            <>
              <p>
                Dénomination:
                <br />
                <strong>{etudeInfo.m_sDénominationEtude}</strong>
              </p>
              <p>
                Numéro voie:
                <br />
                <strong>{etudeInfo.m_nNumVoie}</strong>
              </p>
              <p>
                Adresse:
                <br />
                <strong>{etudeInfo.m_sAdresse}</strong>
              </p>
              <p>
                Complement d'adresse:
                <br />
                <strong>{etudeInfo.m_sAdresseSuite}</strong>
              </p>
              <p>
                Code postal:
                <br />
                <strong>{etudeInfo.m_sCodePostale}</strong>
              </p>
              <p>
                Localité:
                <br />
                <strong>{etudeInfo.m_sLocalite}</strong>
              </p>
              <p>
                BP:
                <br />
                <strong>{etudeInfo.m_sboitepostal}</strong>
              </p>
              <p>
                Code postal BP:
                <br />
                <strong>{etudeInfo.m_sCodepostalboitepostal}</strong>
              </p>
              <p>
                Localité BP:
                <br />
                <strong>{etudeInfo.m_sLocaliteboitepostal}</strong>
              </p>
              <p>
                Telephone fixe:
                <br />
                <strong>{etudeInfo.m_IBAN}</strong>
              </p>
              <p>
                Fax:
                <br />
                <strong>{etudeInfo.m_sfax}</strong>
              </p>
              <p>
                Site web:
                <br />
                <strong>{etudeInfo.m_ssite}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifFicheAvocat;
