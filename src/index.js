import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from './Hooks/AuthContext';
import { ClientProvider } from "./Hooks/ClientContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
    <ClientProvider>
        <App />
      </ClientProvider>
    </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
