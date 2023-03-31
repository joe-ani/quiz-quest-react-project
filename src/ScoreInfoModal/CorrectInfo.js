import React from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import "./CorrectInfo.css";

function CorrectInfo({ correctInfo }) {

  const displayCorrectData = correctInfo.map((data, i) => {
    return (
      <div key={data} className="correct-main-container">
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
    <div className="correct-info-cont">
      <div className="correct-heading">
        <KeyboardDoubleArrowUpRoundedIcon className="arrow-up" />
        <div className="text">Questions You Got</div>
      </div>
      <div className="correct-scroll">{displayCorrectData}</div>
      <div className="faders">
        <div className="fade1"></div>
        <div className="fade2"></div>
      </div>
    </div>
  );
}

export default CorrectInfo;
