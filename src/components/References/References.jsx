import "./References.css";
import { useState } from "react";

import { references } from "../../utils/constants";

export default function References() {
  const [isHidden, setIsHidden] = useState(true);

  const revealList = () => {
    setIsHidden(!isHidden);
  };

  return (
    <section className="section references" id="references">
      <div className="reference__header">
        <p className="reference__title">References</p>
        <button className="reference__button" onClick={revealList}>
          {isHidden ? "Click to Reveal" : "Hide"}
        </button>
      </div>
      <p className={`reference__text ${isHidden ? "" : "hide"}`}>
        This section is meant to be empty until the captcha is completed
      </p>
      <ul className={`references__list ${isHidden ? "hide" : ""}`}>
        {references.map((reference, index) => (
          <li key={index} className="references__list-item">
            <div className="references__reference">
              <p className="reference__detail detail__name">{reference.name}</p>
              <p className="reference__detail">{reference.title}</p>
              <p className="reference__detail">{reference.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
