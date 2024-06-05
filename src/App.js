import React from "react";
import MainRoutes from "./Components/Routes/MainRoutes";
import "./App.css";
import { AuthProvider } from "./Components/AuthContext";

function App() {
    return (
      
    <div className="App-header">
      <MainRoutes />
    </div>
  );
}

export default App;
