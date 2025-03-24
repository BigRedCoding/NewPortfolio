import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";

import ErrorPage from "../404Page/404Page.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../footer/Footer.jsx";
import Captcha from "../Captcha/Captcha.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaSolved, setCaptchaSolved] = useState(false);

  const checkCaptchaSolve = () => {
    if (captchaText.length > 0 && captchaInput.length > 0) {
      if (captchaText == captchaInput) {
        return setCaptchaSolved(true);
      } else {
        return setCaptchaSolved(false);
      }
    }
  };

  const generateRandomText = (length = 5) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return setCaptchaText(result);
  };

  const handleCaptcha = () => {
    setCaptchaSolved(false);
    setActiveModal("captcha");
    generateRandomText();
  };

  useEffect(() => {
    checkCaptchaSolve();
  }, [captchaText, captchaInput]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ captchaSolved }}>
        <div className="page-content">
          <Header handleCaptcha={handleCaptcha} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCaptcha={handleCaptcha}
                  setActiveModal={setActiveModal}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
        <Captcha
          opened={activeModal === "captcha" ? "" : "hide"}
          captchaText={captchaText}
          setCaptchaInput={setCaptchaInput}
          captchaSolved={captchaSolved}
          setActiveModal={setActiveModal}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
