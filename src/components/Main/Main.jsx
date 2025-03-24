import { useState } from "react";
import Demonstrations from "../Demonstrations/Demonstrations";
import Education from "../Education/Education";
import Introduction from "../Introduction/Introduction";
import Navigation from "../Navigation/Navigation";
import References from "../References/References";
import WorkSection from "../WorkSection/WorkSection";
import "./Main.css";

export default function Main({ handleCaptcha, setActiveModal }) {
  const [selection, setSelection] = useState("introduction");

  return (
    <main className="main">
      <Navigation setSelection={setSelection} />
      <div className="sections-container">
        {selection === "introduction" && <Introduction />}
        {selection === "worksection" && <WorkSection />}
        {selection === "education" && <Education />}
        {selection === "demonstrations" && (
          <Demonstrations setActiveModal={setActiveModal} />
        )}
        {selection === "references" && <References />}
      </div>
    </main>
  );
}
