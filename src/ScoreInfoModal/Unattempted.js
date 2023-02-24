import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import "./Unattempted.css";

function Unattempted() {
  return <div className="unattempted">
    <div className="unattempted-cont">
     <div className="text">Unattempted Questions</div>
    <InfoRoundedIcon/>
    </div>
  </div>;
}

export default Unattempted;
