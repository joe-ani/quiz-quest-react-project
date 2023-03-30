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
  correctInfo,
  inCorrectInfo,
  unattemptedInfo,
}) {
  const removeModal = () => {
    setShowScoreInfoModal(false);
  };
  return (
    <div className="score-modal">
      <div className="modal-container">
        {isCorrect && <CorrectInfo correctInfo={correctInfo} />}
        {isInCorrect && <InCorrectInfo inCorrectInfo={inCorrectInfo} />}
        {isUnattempted && <Unattempted unattemptedInfo={unattemptedInfo} />}
        <HighlightOffRoundedIcon
          onClick={removeModal}
          className="close-info-icon"
        />
      </div>
    </div>
  );
}

export default ScoreInfoModal;
