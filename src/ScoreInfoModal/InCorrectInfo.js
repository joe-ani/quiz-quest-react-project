import React from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import "./InCorrectInfo.css";

function InCorrectInfo({inCorrectInfo}) {
  return (
    <div className="incorrect-info-cont">
      <KeyboardDoubleArrowUpRoundedIcon className="arrow-down" />
      <div className="text">Questions You Failed</div>
      <div className="correct-scroll">data</div>
      <div className="faders">
        <div className="fade1"></div>
        <div className="fade2"></div>
      </div>
    </div>
  );
}

export default InCorrectInfo;
