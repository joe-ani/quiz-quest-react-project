import React, { useRef } from "react";
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
  const containerRef = useRef();
  const overlayRef = useRef();
  const removeModal = () => {
    containerRef.current.style.opacity = 0;
    overlayRef.current.style.opacity = 0;
    containerRef.current.style.transform = " translateY(20px)";
    setTimeout(() => {
      setShowScoreInfoModal(false);
    }, 300);
  };
  return (
    <div className="score-modal">
      <div onClick={removeModal} ref={overlayRef} className="overlay"></div>
      <div ref={containerRef} className="modal-container">
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
