import "./Header.css";
import Self from "../../assets/resumephoto.png";
import { contactinfo } from "../../utils/constants";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({ handleCaptcha }) {
  const { captchaSolved } = useContext(CurrentUserContext);

  const [contactInfoVisible, setContactVisibleInfo] = useState(false);

  const setCaptchaDetails = () => {
    if (captchaSolved === true) {
      setContactVisibleInfo(true);
    }
  };

  useEffect(() => {
    setCaptchaDetails();
  }, [captchaSolved]);

  useEffect(() => {
    setCaptchaDetails();
  }, []);

  return (
    <div className="header">
      <div className="header__container">
        <img src={Self} alt="Photo of self" className="header__image" />
        <div className="header__text-container">
          <p className="header__title page__default-remove ">
            BRANDON R DOOLEY
          </p>
          <div className="header__details-container">
            <p className="header__details page__default-remove ">
              35 years old
            </p>
            <p className="header__details page__default-remove ">Post Falls</p>
          </div>
          <button
            type="button"
            onClick={handleCaptcha}
            className={`header__email-button ${
              captchaSolved === true ? "hide" : ""
            }`}
          >
            Contact info
          </button>
          <ul
            className={`header__contact-info ${
              !contactInfoVisible && "hide"
            } page__default-remove`}
          >
            {contactinfo.map((info, index) => (
              <li key={index} className="header__contact-item">
                <strong>{info.label}:</strong> {info.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="header__container2 page__default-remove">
        <h1 className="header__profession-title page__default-remove">
          𝔽𝕦𝕝𝕝-𝕊𝕥𝕒𝕔𝕜 𝕊𝕠𝕗𝕥𝕨𝕒𝕣𝕖 𝔼𝕟𝕘𝕚𝕟𝕖𝕖𝕣
        </h1>
        <p className="header__profession-languages page__default-remove">
          HTML | CSS | Javascript | React.js | Node.js | Express.js | MongoDB |
          Nginx | Certbot
        </p>
      </div>
    </div>
  );
}
