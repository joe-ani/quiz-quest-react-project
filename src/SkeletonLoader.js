import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader() {
  return (
    <div className="skelenton-cont">
      <div className="question-container2">
        <div className="question-cont">
          <h2></h2>

          <p
            style={{
              margin: "20px",
              marginTop: "50px",
              textAlign: "center",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
            officiis?
          </p>
          <p
            style={{
              position: "absolute",
              margin: "20px",
              opacity: "1",
              top: "25px",
              marginTop: "50px",
              textAlign: "center",
              width: "50%",
              height: "15px",
            }}
          ></p>
        </div>
        <div className="option-cont">
          <h2></h2>
          <div className="option-grid">
            <div className="option"> </div>
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
