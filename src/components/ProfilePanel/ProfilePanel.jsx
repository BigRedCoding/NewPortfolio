import "./ProfilePanel.css";

export default function ProfilePanel({ hideVariable }) {
  return (
    <aside className={`profile-panel ${hideVariable}`}>
      <div className="panel__personal" id="Personal-Details-Panel">
        <ul className="panel__identity page__default-remove">
          <li className="panel__identity-image"></li>
          <li className="panel__identity-name">BRANDON R DOOLEY</li>
        </ul>
        <ul className="panel__stats">
          <li className="panel__stat-age">Age: 34</li>
          <li className="panel__stat-gender">Gender: Male</li>
          <li className="panel__stat-location">Location: Post Falls, ID</li>
        </ul>
        <button className="panel__email-button">
          CLICK HERE for email and phone
        </button>
        <div className="panel__contact-info hide">
          <p className="contact__info">Email: brandonroydooley@gmail.com</p>
          <p className="contact__info">Phone: (509)666-2373</p>
          <button type="button" className="contact__close-button">
            Close
          </button>
        </div>
      </div>
    </aside>
  );
}
