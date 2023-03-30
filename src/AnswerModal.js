import React, { useEffect, useRef } from "react";
import "./AnswerModal.css";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function AnswerModal({ setShowAnswerModal, answerModalQuestion, answerModalAnswer }) {
  const modalRef = useRef(null);

  const removeModal = () => {
    setShowAnswerModal(false);
  };

  // * how to execute functions in different components in react 🔍
  // * linking parameters to arguements 🔍

  return (
    <div className="answer-modal">
      <div ref={modalRef} className="container">
        <div className="ques">
          <div className="heading">Question 4</div>
          <div className="text">{answerModalQuestion}</div>
        </div>
        <div className="line"></div>
        <div className="answer">
          <div className="heading">Answer</div>
          <div className="text">{answerModalAnswer}</div>
        </div>
        <HighlightOffRoundedIcon
          onClick={removeModal}
          className="modal-quit-icon"
        />
      </div>
    </div>
  );
}

export default AnswerModal;
