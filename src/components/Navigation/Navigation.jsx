import "./Navigation.css";

export default function Navigation({ setSelection }) {
  return (
    <div className="navigation page__default-remove">
      <ul className="navigation__links page__default-remove">
        <li className="navigation__link">
          <button
            className="navigation__button"
            type="button"
            onClick={() => setSelection("introduction")}
          >
            Introduction
          </button>
        </li>
        <li className="navigation__link">
          <button
            className="navigation__button"
            type="button"
            onClick={() => setSelection("worksection")}
          >
            Work History
          </button>
        </li>
        <li className="navigation__link">
          <button
            className="navigation__button"
            type="button"
            onClick={() => setSelection("education")}
          >
            Education
          </button>
        </li>
        <li className="navigation__link">
          <button
            className="navigation__button"
            type="button"
            onClick={() => setSelection("demonstrations")}
          >
            Demonstrations
          </button>
        </li>
        <li className="navigation__link">
          <button
            className="navigation__button"
            type="button"
            onClick={() => setSelection("references")}
          >
            References
          </button>
        </li>
      </ul>

      <div className="navigation__links-div">
        <p className="navigation__links-text page__default-remove">
          External links:
        </p>
        <div className="navigation__links-button-div">
          <button
            className="navigation__links-button"
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/brandon-roy-dooley/",
                "_blank"
              );
            }}
          ></button>
          <button
            className="navigation__links-button2"
            onClick={() => {
              window.open("https://github.com/BigRedCoding", "_blank");
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}
