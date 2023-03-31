import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { useNavigate } from "react-router-dom";

function Home({ setTime, setTimeDuration, setQuestionCount }) {
  const navigate = useNavigate();
  const linkRef = useRef();
  const listRef = useRef();
  const homeRef = useRef();
  const optionRef = useRef();
  const timeOptionRef = useRef();
  const durationOptionRef = useRef();
  const questionDesRef = useRef();
  const timeDesRef = useRef();
  const durationDesRef = useRef();
  const arrowRef = useRef();
  const timeDropIconRef = useRef();
  const questionDropIconRef = useRef();
  const durationDropIconRef = useRef();
  const timeDataRef = useRef();
  const durationDataRef = useRef();
  const [second, setSecond] = useState(true);
  const [selectedOption, setSelectedOption] = useState("10");
  const [selectedOptionTime, setSelectedOptionTime] = useState("5");
  const [selectedOptionDuration, setSelectedOptionDuration] =
    useState("Minutes");

  useEffect(() => {
    setTime(selectedOptionTime);
    setTimeDuration(selectedOptionDuration);
    setQuestionCount(selectedOption);
  }, [selectedOption, selectedOptionTime, selectedOptionDuration]);

  useEffect(() => {
    window.localStorage.setItem(
      "QUESTION_COUNT",
      JSON.stringify(selectedOption)
    );
    window.localStorage.setItem(
      "TIME_DATA",
      JSON.stringify(selectedOptionTime)
    );
    window.localStorage.setItem(
      "DURATION_DATA",
      JSON.stringify(selectedOptionDuration)
    );
    // window.localStorage.removeItem("QUESTIONS_DATA");
    // window.localStorage.removeItem("OPTIONS_DATA");
  }, [selectedOption, selectedOptionDuration, selectedOptionTime]);
  const handleChangeQuestion = (event) => {
    setSelectedOption(event.target.innerHTML);
    event.target.classList.add("active-list");
    showOptions();
    setQuestionCount(event.target.innerHTML);
  };
  const handleChangeTime = (event) => {
    setSelectedOptionTime(event.target.innerHTML);
    setTime(event.target.innerHTML);
    event.target.classList.add("active-list");
    showTime();
  };
  const handleChangeDuration = (event) => {
    if (event.target.innerHTML === "Minutes") {
      setSecond(true);
      setSelectedOptionTime(5);
      setTimeDuration(event.target.innerHTML);
    } else if (event.target.innerHTML === "Seconds") {
      setSelectedOptionTime(30);
      setSecond(false);
      setTimeDuration(event.target.innerHTML);
    }
    setSelectedOptionDuration(event.target.innerHTML);
    event.target.classList.add("active-list");
    showDuration();
  };

  const [isOption, setIsOption] = useState(true);
  const showOptions = () => {
    if (isOption) {
      questionDropIconRef.current.style.transform = "rotateZ(90deg)";
      optionRef.current.classList.add("show-options");
      questionDesRef.current.style.display = "block";
      setIsOption(false);
    } else {
      questionDropIconRef.current.style.transform = "rotateZ(-90deg)";
      optionRef.current.classList.remove("show-options");
      questionDesRef.current.style.display = "none";
      setIsOption(true);
    }
  };

  const [isTime, setIsTime] = useState(true);
  const showTime = () => {
    if (isTime) {
      timeDropIconRef.current.style.transform = "rotateZ(90deg)";
      timeOptionRef.current.classList.add("show-time");
      timeDesRef.current.style.display = "block";
      setIsTime(false);
    } else {
      timeDropIconRef.current.style.transform = "rotateZ(-90deg)";
      timeOptionRef.current.classList.remove("show-time");
      timeDesRef.current.style.display = "none";
      setIsTime(true);
    }
  };

  const [isDuration, setIsDuration] = useState(true);
  const showDuration = () => {
    if (isDuration) {
      durationDropIconRef.current.style.transform = "rotateZ(90deg)";
      durationOptionRef.current.classList.add("show-duration");
      durationDesRef.current.style.display = "block";
      setIsDuration(false);
    } else {
      durationDropIconRef.current.style.transform = "rotateZ(-90deg)";
      durationOptionRef.current.classList.remove("show-duration");
      durationDesRef.current.style.display = "none";
      setIsDuration(true);
    }
  };

  const goTo = () => {
    window.location.href = "/";
  };
  const [hide, setHide] = useState(false);
  const hideLink = () => {
    if (hide) {
      linkRef.current.classList.add("hide");
      linkRef.current.classList.remove("show");
      arrowRef.current.classList.add("open");
      arrowRef.current.classList.remove("close");
      setHide(false);
    } else {
      linkRef.current.classList.add("show");
      linkRef.current.classList.remove("hide");
      arrowRef.current.classList.remove("open");
      arrowRef.current.classList.add("close");
      setHide(true);
    }
  };

  return (
    <div ref={homeRef} className="home">
      <img src="svg/circle2437.svg" className="svg" />
      <h1>Home </h1>
      <div className="main">
        <div className="question-container">
          {/* drop dwon */}
          <h3>Questions</h3>
          <div className="select-container">
            <div onClick={showOptions} className="select">
              {selectedOption}
              <ArrowBackIosRoundedIcon
                ref={questionDropIconRef}
                className="drop-icon"
              />
            </div>
            <div ref={optionRef} className="options">
              <li onClick={handleChangeQuestion} ref={listRef}>
                5
              </li>
              <li onClick={handleChangeQuestion} ref={listRef}>
                10
              </li>
              <li onClick={handleChangeQuestion} ref={listRef}>
                20
              </li>
              <li onClick={handleChangeQuestion} ref={listRef}>
                30
              </li>
              <li onClick={handleChangeQuestion} ref={listRef}>
                50
              </li>
            </div>
            <div ref={questionDesRef} className="question-des">
              Select up to 50 Questions.
            </div>
          </div>
        </div>
        <div className="time-container">
          <h3>Time</h3>
          <div className="select-container time">
            <div onClick={showTime} ref={timeDataRef} className="select">
              {selectedOptionTime}
              <ArrowBackIosRoundedIcon
                ref={timeDropIconRef}
                className="drop-icon"
              />
            </div>
            <div ref={timeOptionRef} className="options">
              {second ? (
                <>
                  <li onClick={handleChangeTime}>2</li>
                  <li onClick={handleChangeTime}>5</li>
                  <li onClick={handleChangeTime}>10</li>
                </>
              ) : (
                <>
                  <li onClick={handleChangeTime}>20</li>
                  <li onClick={handleChangeTime}>30</li>
                  <li onClick={handleChangeTime}>40</li>
                  <li onClick={handleChangeTime}>50</li>
                  <li onClick={handleChangeTime}>60</li>
                </>
              )}
            </div>
            <div ref={timeDesRef} className="time-des">
              Select a time frame.
            </div>
          </div>
          <div className="select-container duration">
            <div
              onClick={showDuration}
              ref={durationDataRef}
              className="select"
            >
              {selectedOptionDuration}
              <ArrowBackIosRoundedIcon
                ref={durationDropIconRef}
                className="drop-icon"
              />
            </div>
            <div ref={durationOptionRef} className="options">
              <li onClick={handleChangeDuration}>Minutes</li>
              <li onClick={handleChangeDuration}>Seconds</li>
            </div>
            <div ref={durationDesRef} className="duration-des">
              Select a Duration.
            </div>
          </div>
          {/* Drop down */}
        </div>
      </div>
      <div onClick={(e) => navigate("/question")} className="start-button">
        <TimerRoundedIcon className="timer" />
        <h2>Start</h2>
      </div>

      <div className="link-container">
        <img
          className="joe-pic"
          onClick={hideLink}
          src="images/joe.png"
          alt=""
        />
        <div ref={linkRef} className="my-link" onClick={goTo}>
          By Joseph Ani
        </div>
        {/* Close Icon */}
        <ArrowBackIosRoundedIcon
          ref={arrowRef}
          onClick={hideLink}
          sx={{ stroke: "#ffffff", strokeWidth: 2 }}
          className="arrow-icon"
        />
      </div>
      <img className="quiz-logo" src="images/image1647.png" alt="Logo" />
    </div>
  );
}

export default Home;
