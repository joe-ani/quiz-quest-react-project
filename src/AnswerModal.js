import React, { useEffect, useRef } from "react";
import "./AnswerModal.css";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function AnswerModal({
  setShowAnswerModal,
  answerModalQuestion,
  answerModalAnswer,
  modalPage,
}) {
  const modalRef = useRef();
  const overlayRef = useRef();

  const removeModal = () => {
    modalRef.current.style.opacity = 0;
    overlayRef.current.style.opacity = 0;
    modalRef.current.style.transform = " translateY(20px)";
    setTimeout(() => {
      setShowAnswerModal(false);
    }, 300);
  };

  // * how to execute functions in different components in react 🔍
  // * linking parameters to arguements 🔍

  return (
    <div className="answer-modal">
      <div onClick={removeModal} ref={overlayRef} className="overlay"></div>
      <div ref={modalRef} className="container">
        <div className="ques">
          <div className="heading">Question {modalPage}:</div>
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
