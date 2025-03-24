import { Link } from "react-router-dom"; // Import Link
import "./404Page.css";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h2 className="error-page__message">404 - Page Not Found</h2>
      <Link to="/">
        <button className="error-page__button">Go to Home</button>
      </Link>
    </div>
  );
}
