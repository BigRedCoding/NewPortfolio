import "./WorkSection.css";

import React, { useState } from "react";
import { workHistory, WORK_HISTORY_CLASSES } from "../../utils/constants";

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < workHistory.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const workItem = workHistory[activeIndex];

  return (
    <section className={WORK_HISTORY_CLASSES.section} id="work-history">
      <p className={WORK_HISTORY_CLASSES.title}>Work History</p>
      <ul className={WORK_HISTORY_CLASSES.employerList}>
        {workHistory.map((item, index) => (
          <li key={index} className={WORK_HISTORY_CLASSES.listItem}>
            <div className={WORK_HISTORY_CLASSES.companyClasses[index]}>
              <p className={WORK_HISTORY_CLASSES.dates}>{item.dates}</p>
            </div>
            <button
              className={
                WORK_HISTORY_CLASSES.buttonClasses[
                  Object.keys(WORK_HISTORY_CLASSES.buttonClasses)[index]
                ]
              }
            />
          </li>
        ))}
      </ul>
      <div className={WORK_HISTORY_CLASSES.details}>
        <p
          className={WORK_HISTORY_CLASSES.detailsTitle}
          id="work-details-title"
        >
          {workItem.companyName}
        </p>
        <div className={WORK_HISTORY_CLASSES.detailsPanel}>
          <div className={WORK_HISTORY_CLASSES.detailsCdaWindow} id="Cda-page1">
            {workItem.description.map((paragraph, index) => (
              <p key={index} className={WORK_HISTORY_CLASSES.detailsParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {workItem.tasks && (
            <div className={WORK_HISTORY_CLASSES.detailsCdaWindow}>
              <p className={WORK_HISTORY_CLASSES.detailsParagraph}>
                Here is a list of the type of tasks I was concerned with in this
                position:
              </p>
              <ul className={WORK_HISTORY_CLASSES.detailsCdaList}>
                {workItem.tasks.map((task, index) => (
                  <li
                    key={index}
                    className={WORK_HISTORY_CLASSES.detailsCdaListItem}
                  >
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={WORK_HISTORY_CLASSES.navigation}>
        <button
          className={`${WORK_HISTORY_CLASSES.cdaPrevious} ${
            activeIndex === 0 ? "hide" : ""
          }`}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className={`${WORK_HISTORY_CLASSES.cdaNext} ${
            activeIndex === workHistory.length - 1 ? "hide" : ""
          }`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}
