import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Hooks/AuthContext";
import { GeneraliteProvider } from "./Hooks/GeneraliteContext";

import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationProvider } from "./Hooks/NavigationListenerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router> 
      <AuthProvider>
        <GeneraliteProvider>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </GeneraliteProvider>
      </AuthProvider>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
