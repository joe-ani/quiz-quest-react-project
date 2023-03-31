import React from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import "./InCorrectInfo.css";

function InCorrectInfo({ inCorrectInfo }) {
  const displayInCorrectInfoData = inCorrectInfo.map((data, i) => {
    return (
      <div key={data} className="incorrect-main-container">
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
    <div className="incorrect-info-cont">
      <div className="incorrect-heading">
        <KeyboardDoubleArrowUpRoundedIcon className="arrow-down" />
        <div className="text">Questions You Failed</div>
      </div>
      <div className="incorrect-scroll">{displayInCorrectInfoData}</div>
      <div className="faders">
        <div className="fade1"></div>
        <div className="fade2"></div>
      </div>
    </div>
  );
}

export default InCorrectInfo;
