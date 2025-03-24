import React, { useEffect, useRef, useState } from "react";
import "./Captcha.css";

export default function Captcha({
  opened,
  captchaText,
  setCaptchaInput,
  captchaSolved,
  setActiveModal,
}) {
  const [captchaDisplay, setCaptchaDisplay] = useState("");
  const canvasRef = useRef(null);

  const getRandomTextStyle = () => {
    const fontSize = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
    const fontFamilies = [
      "Arial",
      "Verdana",
      "Tahoma",
      "Courier New",
      "Georgia",
    ];
    const fontFamily =
      fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    return {
      fontSize: `${fontSize}px`,
      fontFamily: fontFamily,
      fontWeight: 900,
      transform: "translate(-50%, -50%)",
      zIndex: 1,
      textDecoration: "line-through",
    };
  };

  const generateRandomDistortion = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = Math.random() * 255;
      const green = Math.random() * 255;
      const blue = Math.random() * 255;

      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const closeCaptcha = () => {
    setActiveModal(""); // Close the modal when the close button is clicked
  };

  useEffect(() => {
    setCaptchaDisplay(
      captchaText.split("").map((char, index) => (
        <span key={index} style={getRandomTextStyle()}>
          {char}
        </span>
      ))
    );
    generateRandomDistortion();
  }, [captchaText]);

  useEffect(() => {
    if (captchaSolved) {
      setTimeout(() => {
        setActiveModal("");
      }, 3000);
    }
  }, [captchaSolved, setActiveModal]);

  return (
    <div className={`captcha ${opened}`}>
      <div className="captcha__div">
        <button onClick={closeCaptcha} className="captcha__close-btn">
          Close
        </button>
        <div className="captcha__content">
          <div className="captcha__text">{captchaDisplay}</div>
          <canvas
            ref={canvasRef}
            width="200"
            height="50"
            className="captcha__image"
          ></canvas>
        </div>
        <div>
          <label htmlFor="captchaInput">Enter captcha text here:</label>
          <input
            id="captchaInput"
            type="text"
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="captcha__input"
          />
        </div>
        <div className="captcha__feedback">
          {captchaSolved ? (
            <span className="captcha__success">
              Captcha successfully solved!
            </span>
          ) : (
            <span className="captcha__error">
              The captcha is not solved yet.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
