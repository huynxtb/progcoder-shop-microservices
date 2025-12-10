import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/assets/css/all.min.css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/scss/style.scss";

import { FarzaaContextProvider } from "./context/FarzaaContext.jsx";
import { KeycloakProvider } from "./contexts/KeycloakContext";
import { ToastContainer } from "react-toastify";
import "./i18n/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <KeycloakProvider>
      <FarzaaContextProvider>
        <App />
        <ToastContainer />
      </FarzaaContextProvider>
    </KeycloakProvider>
  </BrowserRouter>
);
