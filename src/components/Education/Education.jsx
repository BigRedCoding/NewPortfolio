import React from "react";

import "./Education.css";

import NorthIdaho from "../../assets/northidaho.png";
import LewisClark from "../../assets/lewisclark.png";
import TripleTen from "../../assets/tripleten.svg";

export default function Education() {
  return (
    <section className="section education" id="education">
      <p className="education__title">Education</p>
      <ul className="education__icons">
        <li className="education__icons-item">
          <p className="education__dates">
            October 1st, 2024 - March 21st, 2025
          </p>
          <a
            href="https://www.tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="education__icons-button2"
              src={TripleTen}
              alt="TripleTen"
            />
          </a>
        </li>
        <li className="education__icons-item">
          <p className="education__dates">2009 - 2013</p>
          <a
            href="https://www.lcsc.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="education__icons-button1"
              src={LewisClark}
              alt="Lewis Clark State College"
            />
          </a>
        </li>

        <li className="education__icons-item">
          <p className="education__dates">2006 - 2009</p>
          <a
            href="https://www.nic.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="education__icons-button"
              src={NorthIdaho}
              alt="North Idaho College"
            />
          </a>
        </li>
      </ul>
      <p className="education__paragraph">
        I started the dual enrollment program in 2006 through North Idaho
        College (NIC). Other than the first semester, my classes were primarily
        at the NIC campus. Originally, I was going to pursue Engineering through
        the University of Idaho, which would have entailed transferring to
        Moscow after earning my Associates. After evaluating costs, involving
        myself in stupidity as mentioned previously, and learning that
        Lewis-Clark State College (LCSC) was running their campus and programs
        right next to NIC, I decided to pursue a Bachelors in Communications and
        Management. This gave me the option to dual enroll between NIC and LCSC,
        allowing me to earn a 3.85 GPA with 18 credits during the spring of
        2010. This named me to LCSC's Dean's List and also encouraged offers to
        participate with the Ambassador Honor's Society and the National Society
        of Leadership and Success.
      </p>
      <p className="education__paragraph">
        In total throughout my educational experiences, the four degrees I
        earned were a B.A. and a B.S. in Communication Arts, B.S. in Management,
        and an A.A in General Studies. I also earned a Certificate of Leadership
        and Management in the Hospitality Industry from the American Hotel &
        Lodging Educational Institute and the ServSafe Certification from the
        National Restaurant Association during my time with McDonald's.
      </p>
      <p className="education__paragraph">
        I just recently graduated my 10-month program through TripleTen. I
        started this program October 1st, 2024. My final project was accepted
        March 11th, 2025, which signified that I had completed the program. My
        graduation was March 21st, 2025. We were able to present our projects; I
        ended up somewhat intimidating the other students because my project had
        so many features and designs in comparison, including a full backend
        implementation and deployment that others hadn't completed yet, and I
        had went first, so there was kind of an awkward pause after the host
        asked who was next.
      </p>
    </section>
  );
}
