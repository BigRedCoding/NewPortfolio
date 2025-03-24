import "./Demonstrations.css";
import { demonstrations } from "../../utils/constants";
import { useEffect, useState } from "react";

export default function Demonstrations({ setActiveModal }) {
  const [listItems, setListItems] = useState([]);

  const openRavens = () => {
    window.open("/src/games/game/sampleravens.html", "_blank");
  };
  const openShooter = () => {
    window.open("/src/games/game2/sampleshooter.html", "_blank");
  };
  const openRpg = () => {
    window.open("/src/games/game3/demorpg.html", "_blank");
  };

  useEffect(() => {
    const list = demonstrations.map((item, index) => {
      const isModalLink = item.linkType === "modal";

      return (
        <li key={index} className="demonstrations__item">
          <div className="demonstration__link-div"></div>

          {isModalLink ? (
            <button
              onClick={() => {
                eval(item.link);
              }}
              className={`demonstrations__button ${item.buttonClass}`}
            >
              <span className="demonstrations__span-tag">
                {item.type === "website" ? "Website" : "Game"}:
              </span>
              {item.label}
            </button>
          ) : (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`demonstrations__button ${item.buttonClass}`}
            >
              <span className="demonstrations__span-tag">
                {item.type === "website" ? "Website" : "Game"}:
              </span>
              {item.label}
            </a>
          )}

          <p
            className="demonstration__description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></p>
        </li>
      );
    });

    setListItems(list);
  }, []);

  return (
    <section className="section demonstrations" id="demonstrations">
      <p className="demonstrations__title">Demonstrations</p>
      <ul className="demonstrations__panel" id="demonstrations-list">
        {listItems}
      </ul>
    </section>
  );
}
