import React from "react";
import "./ScoreInfoModal.css";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CorrectInfo from "./ScoreInfoModal/CorrectInfo.js";
import InCorrectInfo from "./ScoreInfoModal/InCorrectInfo";
import Unattempted from "./ScoreInfoModal/Unattempted";

function ScoreInfoModal({
  setShowScoreInfoModal,
  isCorrect,
  isInCorrect,
  isUnattempted,
}) {
  const removeModal = () => {
    setShowScoreInfoModal(false);
  };
  return (
    <div className="score-modal">
      <div  className="modal-container">
        {isCorrect && <CorrectInfo/>}
        {isInCorrect && <InCorrectInfo />}
        {isUnattempted && <Unattempted />}
        <HighlightOffRoundedIcon
          onClick={removeModal}
          className="close-info-icon"
        />
      </div>
    </div>
  );
}

export default ScoreInfoModal;
