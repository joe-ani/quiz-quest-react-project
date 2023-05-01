import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader() {
  return (
    <div className="skelenton-cont">
      <div className="question-container2">
        <div className="question-cont">
          <h2></h2>
        </div>
          <p></p>
        <div className="option-cont">
          <h2></h2>
          <div className="option-grid">
            <div className="option"></div>
            <div className="option"></div>
            <div className="option"></div>
            <div className="option"></div>
          </div>
          <div className="text"> ** Carefully answer each question **</div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
