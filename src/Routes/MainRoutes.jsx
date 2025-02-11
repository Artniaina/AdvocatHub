import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PartialProtectedRoute from "./PartialProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/SimpleAuthentication/Login";
import Page404 from "../Pages/Page404";
import Registration from "../Pages/SimpleAuthentication/Registration";
import ModifMdp from "../Pages/SimpleAuthentication/ModifMdp";
import ValidationOTP from "../Pages/DoubleAuthentication/ValidationOTP";
import HomePage from "../Pages/HomePage";
import VerifEmail from "../Pages/SimpleAuthentication/VerifEmail";
import UserList from "../Components/AdminDashboard/UserList";
import FAQ from "../Pages/FAQPage";
import MessageriePage from "../Pages/MessageriePage";
import Document from "../Pages/DocumentPage";
import FicheAvocatPage from "../Pages/FicheAvocatPage";
import TaxationFormPage from "../Pages/TaxationFormPage";
import UsersGuide from "../Pages/DoubleAuthentication/UsersGuide";
import UpdateTaxationFormPage from "../Pages/UpdateTaxationFormPage";
import ListeFormulairePage from "../Pages/ListeFormulairePage";
import UploadDocs from "../Components/Document/UploadDocument/UploadDocs";
import VersionControl from "../Components/Document/VersionControl/VersionControl";
import ListeDocumentPartages from "../Components/Document/DocumentPartages/ListeDocumentPartages";
import DocumentPartages from "../Components/Document/DocumentPartages/DocumentPartages";
import DocumentListComp from "../Components/Document/DocumentList/DocumentListComp";
import PlanningPage from "../Pages/PlanningPage";
import Invitation from "../Components/Planning/Invitation";
import Dashboard from "../Components/AdminDashboard/Dashboard";
import UserListManagement from "../Components/AdminDashboard/UserListManagement";
import AvocatList from "../Components/AdminDashboard/AvocatList";
import PreMeetingRoom from "../Components/VisioConference/PreMeetingRoom";
import Meeting from "../Components/VisioConference/Meeting";
import FicheAvocat from "../Components/AdminDashboard/GestionDesAvocats/FicheAvocat";
import FicheEtude from "../Components/AdminDashboard/GestionDesEtudes/FicheEtude";
import ModifFiche from "../Components/AdminDashboard/GestionDesAvocats/ModifFiche";
import AddFiche from "../Components/AdminDashboard/GestionDesAvocats/AddFiche";
import EtudeList from "../Components/AdminDashboard/EtudeList";
import AddEtude from "../Components/AdminDashboard/GestionDesEtudes/AddEtude";
import ModifEtude from "../Components/AdminDashboard/GestionDesEtudes/ModifEtude";

function PageTitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    let pageTitle = "";
    switch (pathname) {
      case "/":
        pageTitle = "LOGIN";
        break;
      case "/home":
        pageTitle = "ACCEUIL";
        break;
      case "/home/modifFiche":
        pageTitle = "ACCEUIL";
        break;
      case "/home/formTaxation":
        pageTitle = "DEMANDE D'INFORMATIONS POUR TAXATION";
        break;
      case "/faq":
        pageTitle = "FAQ";
        break;
      case "/document":
        pageTitle = "DOCUMENT";
        break;
      case "/chat":
        pageTitle = "ARTICLES";
        break;
      case "/userlist":
        pageTitle = "LISTE UTILISATEURS";
        break;
      case "/scanqrcode":
        pageTitle = "DOUBLE AUTHENTIFICATION";
        break;
      case "/registration":
        pageTitle = "INSCRIPTION";
        break;
      case "/verifemail":
        pageTitle = "EMAIL";
        break;
      case "/modifmdp":
        pageTitle = "MODIFICATION";
        break;
      case "/validationotp":
        pageTitle = "DOUBLE AUTHENTIFICATION";
        break;
      default:
        pageTitle = "React";
        break;
    }

    document.title = pageTitle;
  }, [location]);
  return null;
}

function MainRoutes() {
  return (
    <>
      <PageTitleUpdater />
      <Routes>
        <Route path="/meeting" element={<PreMeetingRoom />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
        {/* SIMPLE ROUTE EVERYONE CAN ACCESS WITHOUT BEING AUTHENTICATED */}
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verifemail" element={<VerifEmail />} />
        <Route path="/modifmdp" element={<ModifMdp />} />
        <Route path="/invitation" element={<Invitation />} />

    
        {/* PRIVATE ROUTE: ACCESSIBLE ONLY FOR ADMIN */}
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/avocats" element={<AvocatList />} />
        <Route path="/utilisateurs" element={<UserListManagement />} />
        <Route path="/addFicheAvocat" element={<AddFiche />} />
        <Route path="/addFicheEtude" element={<AddEtude />} />
        <Route path="/updateFicheAvocat" element={<ModifFiche />} />
        <Route path="/updateFicheEtude" element={<ModifEtude />} />
        <Route path="/etude" element={<EtudeList />} />
        <Route element={<PrivateRoute />}>
        </Route>

        {/* PARTIAL PROTECTED ROUTE: ACCESSIBLE WITHOUT 2FA AUTHENTICATION :3*/}
        <Route element={<PartialProtectedRoute />}>
          <Route exact path="/scanqrcode" element={<UsersGuide />} />
          <Route path="/validationotp" element={<ValidationOTP />} />
        </Route>

        {/* MAIN PROTECTED ROUTE: NEED AUTHENTICATION WITH 2FA */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home/formTaxation" element={<TaxationFormPage />} />
          <Route path="/home/modifFiche" element={<FicheAvocatPage />} />
          <Route path="/document/uploadDocument" element={<UploadDocs />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/document" element={<Document />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/chat" element={<MessageriePage />} />

          <Route
            path="/home/updateFormTaxation"
            element={<UpdateTaxationFormPage />}
          />
          <Route
            path="/home/listeFormulaire"
            element={<ListeFormulairePage />}
          />
          <Route path="/documents" element={<DocumentListComp />} />
          <Route path="/shared-documents" element={<DocumentPartages />} />
          <Route path="/upload" element={<UploadDocs />} />
          <Route path="/versioning" element={<VersionControl />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
