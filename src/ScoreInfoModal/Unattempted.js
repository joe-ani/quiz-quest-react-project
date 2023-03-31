import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import "./Unattempted.css";

function Unattempted({ unattemptedInfo }) {
  const displayUnattemptedData = unattemptedInfo.map((data, i) => {
    return (
      <div key={data} className="unattempted-main-container">
        <div className="ques">
          <div className="heading">Question {data.page}:</div>
          <div className="text">{data.question}</div>
        </div>
        <div className="line"></div>
        <div className="answer">
          <div className="heading">Answer</div>
          <div className="text">{data.answer}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="unattempted">
      <div className="unattempted-heading">
        <InfoRoundedIcon className="info-icon"/>
        <div className="text">Unattempted Questions</div>
      </div>
      <div className="unattempted-scroll">{displayUnattemptedData}</div>
      <div className="faders">
        <div className="fade1"></div>
        <div className="fade2"></div>
      </div>
    </div>
  );
}

export default Unattempted;
