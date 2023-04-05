import React from "react";
import "./TimesUpOverlay.css";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { useNavigate } from "react-router-dom";

function TimesUpOverlay() {
  const navigate = useNavigate();

  return (
    <div className="overlay">
      <div className="svg-cont">
        <img className="human" src="svg/human.svg" alt="" />
        <h2>Your Times Up!</h2>
      </div>
      <div className="button-cont">
        <div className="retry-button">
          <ReplayRoundedIcon
            onClick={(e) => navigate("/question")}
            className="retry-icon"
          />
          Retry
        </div>
        <div onClick={(e) => navigate("/result")} className="result-button">
          <BarChartRoundedIcon
            style={{ transform: "rotate(0deg)" }}
            className="navigate"
          />
          Results
        </div>
      </div>
    </div>
  );
}

export default TimesUpOverlay;
