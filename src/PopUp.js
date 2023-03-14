import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopUp.css";

function PopUp({ setTogglePopUp }) {
  const navigate = useNavigate();

  const removeModal = () => {
    setTogglePopUp(false);
  };

  return (
    <div className="pop-up-overlay">
      <div onClick={removeModal} className="overlay"></div>
      <div className="pop-up">
        <div className="txt">Are You sure ?</div>
        <div className="cont">
          <div onClick={() => navigate("/home")} className="yes">
            Quit
          </div>
  
          <div className="no" onClick={removeModal}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
