import React, { useEffect, useRef } from "react";
import "./AboutModal.css";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { set } from "lodash";

function AboutModal({ setShowAbout, showAbout }) {
  const containerRef = useRef();
  const overlayRef = useRef();

  const removeAbout = () => {
    containerRef.current.style.opacity = 0;
    overlayRef.current.style.opacity = 0;
    containerRef.current.style.transform = " translateY(20px)";
    setTimeout(() => {
      setShowAbout(false);
    }, 300);
  };

  return (
    <div className="about-modal">
      <div
        className="about-overlay"
        ref={overlayRef}
        onClick={removeAbout}
      ></div>
      <div ref={containerRef} className="about-container">
        <HighlightOffRoundedIcon
          onClick={removeAbout}
          className="close-about-icon"
        />
        <div className="developer-info">
          <img className="my-img" src="images/joe.png" alt="Joseph Ani" />
          <div className="user-name">Joseph Ani</div>
        </div>
        <div className="links">
          <a
            className="portfolio-link"
            style={{
              textDecoration: "none",
              color: "white",
            }}
            href=""
            target="_blank"
          >
            Portfolio 🧑🏾‍💻
          </a>
          <a
            className="github-link"
            style={{
              textDecoration: "none",
              color: "white",
            }}
            href="https://github.com/joe-ani/quiz-quest-react-project"
            target="_blank"
          >
            View source Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
