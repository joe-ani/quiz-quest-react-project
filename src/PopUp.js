import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUp.css";

function PopUp({ setTogglePopUp, isResult }) {
  const navigate = useNavigate();
  const popUpRef = useRef()
  const overlayRef = useRef()
  const removeModal = () => {
    popUpRef.current.style.opacity = 0;
    overlayRef.current.style.opacity = 0;
    popUpRef.current.style.transform = " translateY(20px)";
    setTimeout(() => {
      setTogglePopUp(false);
    }, 300);
  };

  return (
    <div className="pop-up-overlay">
      <div onClick={removeModal}  ref={overlayRef} className="overlay"></div>
      <div ref={popUpRef} className="pop-up">
        {isResult ? (
          <div className="txt">Are You sure ?</div>
        ) : (
          <div className="txt">Attempt a Question</div>
        )}

        {isResult ? (
          <div className="cont">
            <div onClick={() => navigate("/home")} className="yes">
              Quit
            </div>

            <div className="no" onClick={removeModal}>
              Cancel
            </div>
          </div>
        ) : (
          <div className="cont">
            <div className="no" onClick={removeModal}>
              Ok
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUp;
