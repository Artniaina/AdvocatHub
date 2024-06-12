import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ModifFicheAvocat = ({ avocatInfo, etudeInfo }) => {
  const navigate = useNavigate();
  const langues = avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(',') : [];
  const activites = avocatInfo && avocatInfo.m_langue ? avocatInfo.m_sactivitépref.split(',') : [];
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);
  const [showLanguePopup, setShowLanguePopup] = useState(false);
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
  
  const handleLangueClick = () => {
    setShowLanguePopup(true);
  };

  const closeLanguePopup = () => {
    setShowLanguePopup(false);
  };

  const aj = avocatInfo && avocatInfo.m_dispenseaj;
  const [isDispensed, setIsDispensed] = useState(aj);
  useEffect(() => {
    setIsDispensed(aj);
  }, [avocatInfo]);
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
            <strong>{avocatInfo && avocatInfo.m_dDateNaissance} </strong>
          </p>
          <hr />
          <p>
            Lieu de naissance:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sLieuNaissance}</strong>
          </p>
          <p style={{ height: "180px" }}>
            Adresse privée:
            <br />
            <span>
              <strong>{avocatInfo && avocatInfo.m_sAdressePrivee}</strong>
              <button className="btnpop" onClick={handleDocumentClick}>
                <FaFilePen />
              </button>
              {showDocumentPopup && (
                <PopUpAdressePrivee onClose={closeDocumentPopup} />
              )}
            </span>
          
          </p>

          <p>
            Téléphone mobile:
            <select name="pays">
              <option value="+355">Albanie</option>
              <option value="+213">Algérie</option>
              <option value="+376">Andorre</option>
              <option value="+54">Argentine</option>
              <option value="+374">Arménie</option>
              <option value="+297">Aruba</option>
              <option value="+61">Australie</option>
              <option value="+43">Autriche</option>
              <option value="+994">Azerbaïdjan</option>
              <option value="+1 268">Antigua-et-Barbuda</option>
              <option value="+1 242">Bahamas</option>
              <option value="+973">Bahreïn</option>
              <option value="+880">Bangladesh</option>
              <option value="+1 246">Barbade</option>
              <option value="+375">Biélorussie</option>
              <option value="+32">Belgique</option>
              <option value="+501">Belize</option>
              <option value="+229">Bénin</option>
              <option value="+975">Bhoutan</option>
              <option value="+591">Bolivie</option>
              <option value="+387">Bosnie-Herzégovine</option>
              <option value="+267">Botswana</option>
              <option value="+55">Brésil</option>
              <option value="+673">Brunei</option>
              <option value="+359">Bulgarie</option>
              <option value="+226">Burkina Faso</option>
              <option value="+257">Burundi</option>
              <option value="+855">Cambodge</option>
              <option value="+237">Cameroun</option>
              <option value="+1">Canada</option>
              <option value="+238">Cap-Vert</option>
              <option value="+236">République centrafricaine</option>
              <option value="+235">Tchad</option>
              <option value="+56">Chili</option>
              <option value="+86">Chine</option>
              <option value="+357">Chypre</option>
              <option value="+57">Colombie</option>
              <option value="+269">Comores</option>
              <option value="+506">Costa Rica</option>
              <option value="+385">Croatie</option>
              <option value="+53">Cuba</option>
              <option value="+599">Curaçao</option>
              <option value="+45">Danemark</option>
              <option value="+253">Djibouti</option>
              <option value="+1 767">Dominique</option>
              <option value="+1">République dominicaine</option>
              <option value="+670">Timor oriental</option>
              <option value="+593">Équateur</option>
              <option value="+20">Égypte</option>
              <option value="+503">Salvador</option>
              <option value="+291">Érythrée</option>
              <option value="+372">Estonie</option>
              <option value="+251">Éthiopie</option>
              <option value="+679">Fidji</option>
              <option value="+358">Finlande</option>
              <option value="+33">France</option>
              <option value="+241">Gabon</option>
              <option value="+220">Gambie</option>
              <option value="+995">Géorgie</option>
              <option value="+49">Allemagne</option>
              <option value="+233">Ghana</option>
              <option value="+350">Gibraltar</option>
              <option value="+30">Grèce</option>
              <option value="+299">Groenland</option>
              <option value="+1 473">Grenade</option>
              <option value="+502">Guatemala</option>
              <option value="+224">Guinée</option>
              <option value="+245">Guinée-Bissau</option>
              <option value="+592">Guyana</option>
              <option value="+509">Haïti</option>
              <option value="+504">Honduras</option>
              <option value="+852">Hong Kong</option>
              <option value="+36">Hongrie</option>
              <option value="+354">Islande</option>
              <option value="+91">Inde</option>
              <option value="+62">Indonésie</option>
              <option value="+98">Iran</option>
              <option value="+964">Irak</option>
              <option value="+353">Irlande</option>
              <option value="+44">Royaume-Uni</option>
              <option value="+972">Israël</option>
              <option value="+39">Italie</option>
              <option value="+225">Côte d'Ivoire</option>
              <option value="+1 876">Jamaïque</option>
              <option value="+81">Japon</option>
              <option value="+962">Jordanie</option>
              <option value="+7">Kazakhstan</option>
              <option value="+254">Kenya</option>
              <option value="+686">Kiribati</option>
              <option value="+965">Koweït</option>
              <option value="+996">Kirghizistan</option>
              <option value="+856">Laos</option>
              <option value="+371">Lettonie</option>
              <option value="+961">Liban</option>
              <option value="+266">Lesotho</option>
              <option value="+231">Liberia</option>
              <option value="+218">Libye</option>
              <option value="+423">Liechtenstein</option>
              <option value="+370">Lituanie</option>
              <option value="+352">Luxembourg</option>
              <option value="+853">Macao</option>
              <option value="+389">Macédoine du Nord</option>
              <option value="+261">Madagascar</option>
              <option value="+265">Malawi</option>
              <option value="+60">Malaisie</option>
              <option value="+960">Maldives</option>
              <option value="+223">Mali</option>
              <option value="+356">Malte</option>
              <option value="+692">Îles Marshall</option>
              <option value="+222">Mauritanie</option>
              <option value="+230">Maurice</option>
              <option value="+262">Mayotte</option>
              <option value="+52">Mexique</option>
              <option value="+691">États fédérés deMicronésie</option>
              <option value="+373">Moldavie</option>
              <option value="+377">Monaco</option>
              <option value="+976">Mongolie</option>
              <option value="+382">Monténégro</option>
              <option value="+212">Maroc</option>
              <option value="+258">Mozambique</option>
              <option value="+264">Namibie</option>
              <option value="+674">Nauru</option>
              <option value="+977">Népal</option>
              <option value="+31">Pays-Bas</option>
              <option value="+687">Nouvelle-Calédonie</option>
              <option value="+64">Nouvelle-Zélande</option>
              <option value="+505">Nicaragua</option>
              <option value="+227">Niger</option>
              <option value="+234">Nigeria</option>
              <option value="+683">Niue</option>
              <option value="+47">Norvège</option>
              <option value="+968">Oman</option>
              <option value="+92">Pakistan</option>
              <option value="+680">Palaos</option>
              <option value="+970">Palestine</option>
              <option value="+507">Panama</option>
              <option value="+675">Papouasie-Nouvelle-Guinée</option>
              <option value="+595">Paraguay</option>
              <option value="+51">Pérou</option>
              <option value="+63">Philippines</option>
              <option value="+48">Pologne</option>
              <option value="+351">Portugal</option>
              <option value="+1">Porto Rico</option>
              <option value="+974">Qatar</option>
              <option value="+262">Réunion</option>
              <option value="+40">Roumanie</option>
              <option value="+7">Russie</option>
              <option value="+250">Rwanda</option>
              <option value="+685">Samoa</option>
              <option value="+378">Saint-Marin</option>
              <option value="+239">Sao Tomé-et-Principe</option>
              <option value="+966">Arabie saoudite</option>
              <option value="+221">Sénégal</option>
              <option value="+381">Serbie</option>
              <option value="+248">Seychelles</option>
              <option value="+232">Sierra Leone</option>
              <option value="+65">Singapour</option>
              <option value="+421">Slovaquie</option>
              <option value="+386">Slovénie</option>
              <option value="+677">Îles Salomon</option>
              <option value="+252">Somalie</option>
              <option value="+27">Afrique du Sud</option>
              <option value="+82">Corée du Sud</option>
              <option value="+211">Soudan du Sud</option>
              <option value="+34">Espagne</option>
              <option value="+94">Sri Lanka</option>
              <option value="+1 869">Saint-Christophe-et-Niévès</option>
              <option value="+1 758">Sainte-Lucie</option>
              <option value="+1 784">Saint-Vincent-et-les-Grenadines</option>
              <option value="+249">Soudan</option>
              <option value="+597">Suriname</option>
              <option value="+268">Eswatini</option>
              <option value="+46">Suède</option>
              <option value="+41">Suisse</option>
              <option value="+963">Syrie</option>
              <option value="+886">Taïwan</option>
              <option value="+992">Tadjikistan</option>
              <option value="+255">Tanzanie</option>
              <option value="+66">Thaïlande</option>
              <option value="+670">Timor oriental</option>
              <option value="+228">Togo</option>
              <option value="+676">Tonga</option>
              <option value="+1 868">Trinité-et-Tobago</option>
              <option value="+216">Tunisie</option>
              <option value="+90">Turquie</option>
              <option value="+993">Turkménistan</option>
              <option value="+688">Tuvalu</option>
              <option value="+256">Ouganda</option>
              <option value="+380">Ukraine</option>
              <option value="+598">Uruguay</option>
              <option value="+998">Ouzbékistan</option>
              <option value="+678">Vanuatu</option>
              <option value="+39">Vatican</option>
              <option value="+58">Venezuela</option>
              <option value="+84">Viêt Nam</option>
              <option value="+967">Yémen</option>
              <option value="+260">Zambie</option>
              <option value="+263">Zimbabwe</option>
            </select>
          </p>

          <p>
            E-mail privé:
            <input type="text" />
          </p>
          <p>
            IBAN:
            <input type="text" defaultValue={avocatInfo && avocatInfo.m_IBAN} />
          </p>
          <p>
            Code BIC:
            <input type="text" defaultValue={avocatInfo && avocatInfo.m_BIC} />
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
           <input type="text" />
          </p>
          <p>
            Date d'assermentation:
            <br />
            <strong>{avocatInfo && avocatInfo.m_dDateAssermentation}</strong>
          </p>
          <p>
            Date d'avoué:
            <br />
            <strong>{avocatInfo && avocatInfo.m_dDateAvoue}</strong>
          </p>
          <p>
          Langue parlées:
          <br />
            <span>
            {langues.map((langue, index) => (
            <React.Fragment key={index}>
             <strong>{langue}</strong> 
              <br />
            </React.Fragment>
          ))}
              <button onClick={handleLangueClick}><BsPlusCircleFill /></button>          
              {showLanguePopup && (
                <PopUpLangueParlees onClose={closeLanguePopup} />
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
              <button onClick={handleActiviteClick}><BsPlusCircleFill /></button>          
              {showActivPrefPopup && (
                <PopUpActiPref onClose={closeActivitePopup} />
              )}
            </span>
          </p>
         
          <p>Assistance Judiciaire:</p>
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
        </div>
      </div>
      <div className="container" style={{ marginRight: "30px" }}>
        <img src={EtudeIcon} alt="logo" className="logo" />
        <h1>
          Etude <hr className="hr" />
        </h1>
        <div className="containerInfo">
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
                Telehone fixe:
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
          
        </div>
      </div>
    </div>
  );
};

export default ModifFicheAvocat;
