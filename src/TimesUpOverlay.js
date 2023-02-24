import React from "react";
import "./TimesUpOverlay.css";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
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
          <ReplayRoundedIcon className="retry-icon" />
          Retry
        </div>
        <div onClick={(e) => navigate("/result")} className="result-button">
          Results
          <NavigationRoundedIcon className="navigate" />
        </div>
      </div>
    </div>
  );
}

export default TimesUpOverlay;
