import React, { useRef, useEffect } from "react";
import "./Load.css";
// import logo from ".images/image1647.png";

function Load() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const goTo = () => {
    window.location.href = "/";
    // console.log(linkRef)
  };

  // Use Svg 
  
  return (
    <div className="load" ref={containerRef}>
<img src="svg/circle2437.svg" className="svg"/>
      {/* Logo */}
      <img ref={imageRef} className="image-logo" src="images/image1647.png" alt="Logo" />
      {/* Text */}
      <div className="text">A Fun General Knowledge Quiz Project </div>
      {/* Protfolio link */}
      <div className="my-link-container">
        <img className="joe" src="images/joe.png" alt="" />
        <div className="link" onClick={goTo}>
          By Joseph Ani
        </div>
        {/* Close Icon */}
      </div>
      {/* generate aniamted boubbles */}
    </div>
  );
}

export default Load;
