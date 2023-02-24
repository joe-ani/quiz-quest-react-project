import React, { useRef, useContext } from "react";
import "./Question.css";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TimesUpOverlay from "./TimesUpOverlay.js";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { duration } from "@mui/material";

// "https://the-trivia-api.com/api/questions?limit=20"

function Question({ time, timeDuration, setTime, setTimeDuration }) {
  const navigate = useNavigate();
  const linkRef = useRef();
  const arrowRef = useRef();
  const popUpRef = useRef();
  const [showPop, setShowPop] = useState(false);
  const [second, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [timingDuration, setTimingDuration] = useState();
  const userPerPage = 1;
  const pagesVisited = pageNumber * userPerPage;
  const displayQuestion = questions
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((qes) => {
      return <div>{qes.question}</div>;
    });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(questions.length / userPerPage);

  // ADD AUIDO

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timesUp === false) {
        if (second <= 59) {
          setSeconds((second) => second + 1);
        }
      }
      if (timeDuration == "Minutes") {
        if (minute == time) {
          setTimesUp(true);
        }
      } else if (timeDuration == "Seconds") {
        if (second == time) {
          setTimesUp(true);
        }
      }
      if (second == 60) {
        if (minute <= time) {
          setSeconds(1);
          setMinute((minute) => minute + 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [second, minute]);

  // setInterval(timer, 1000)

  // * how to use setInterval in react 🔍

  const goTo = () => {
    window.location.href = "/";
  };

  const [hide, setHide] = useState(false);
  const hideLink = () => {
    if (hide) {
      setHide(false);
      linkRef.current.classList.add("hide");
      linkRef.current.classList.remove("show");
      arrowRef.current.classList.add("open");
      arrowRef.current.classList.remove("close");
    } else {
      setHide(true);

      linkRef.current.classList.add("show");
      linkRef.current.classList.remove("hide");
      arrowRef.current.classList.remove("open");
      arrowRef.current.classList.add("close");
    }
  };

  const showPopUp = () => {
    if (showPop == false) {
      popUpRef.current.style.display = "flex";
      setShowPop(true);
    } else if (showPop == true) {
      popUpRef.current.style.display = "none";
      setShowPop(false);
    }
  };

  // const [timeData, setTimeData] = useState()
  useEffect(() => {
    const timeData = window.localStorage.getItem("TIME_DATA");
    const durationData = window.localStorage.getItem("DURATION_DATA");
    // setTimeDuration(JSON.parse(durationData));
    // setTime(JSON.parse(timeData));
    // console.log(durationData, timeData);
    // console.log(time, timeDuration);
    // console.log(timeData, timeDuration);
  }, []);

  useEffect(() => {
    if (timeDuration) {
      window.localStorage.setItem("TIME_DATA", JSON.stringify(time));
      window.localStorage.setItem(
        "DURATION_DATA",
        JSON.stringify(timeDuration)
      );
      // console.log(timeData, durationData);
      setTimingDuration(
        timeDuration
          .split("")
          .reverse()
          .slice(4)
          .reverse()
          .join("")
          .toLowerCase()
      );
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://the-trivia-api.com/api/questions?limit=20"
        );
        setQuestions(response.data);
        setIncorrectAnswers(response.data);
        questions.map((qus) => {
          console.log(qus.incorrectAnswers);
        });
        // console.log(questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="question">
      {/* first container */}
      <div className="top-container">
        <img className="top-logo" src="images/image1647.png" alt="Logo" />
        <div className="timer-container">
          {/* clock icon */}
          <TimelapseRoundedIcon className="timer-icon" />
          <div className="time">
            <div
              className="time-spent"
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              {minute}:{second} /
              <div className="time-set">
                {time}
                {timingDuration}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="pages">
          {pagesVisited + 1} / {pageCount}
        </div>
        <div className="question-container2">
          <div className={`question-cont ${!questions ? "show-skeleton" : ""}`}>
            <h2>Qustion {pagesVisited + 1}:</h2>

            <p
              style={{
                margin: "20px",
                marginTop: "50px",
                textAlign: "center",
              }}
            >
              {displayQuestion}
              {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
              officiis? */}
            </p>
          </div>
          <div className="option-cont">
            <h2>Options</h2>
            <div className="option-grid">
              <div className="option">
                {" "}
                <div className="option-count">A</div> Lorem ipsum
              </div>
              <div className="option">
                {" "}
                <div className="option-count">B</div> Lorem ipsum
              </div>
              <div className="option">
                {" "}
                <div className="option-count">C</div> Lorem ipsum
              </div>
              <div className="option">
                {" "}
                <div className="option-count">D</div> Lorem ipsum
              </div>
              <div className="option">
                {" "}
                <div className="option-count">E</div> Lorem ipsum
              </div>
            </div>
            <div className="text">** You can only select an option once **</div>
          </div>
        </div>
        <div className="buttons">
          <div onClick={showPopUp} className="quit-button">
            {/* Quit icon */}
            <HighlightOffRoundedIcon className="quit-icon" />
            <h2 style={{ userSelect: "none" }}>Quit</h2>

            <div ref={popUpRef} className="pop-up">
              <div className="txt">Are You sure ?</div>
              <div onClick={(e) => navigate("/home")} className="yes">
                Quit
              </div>
              <div className="no">Cancel</div>
            </div>
          </div>
          <ReactPaginate
            previousLabel={<ArrowLeftRoundedIcon className="left-icon" />}
            nextLabel={<ArrowLeftRoundedIcon className="right-icon" />}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            previousClassName={"prevClass"}
            nextClassName={"nextClass"}
            containerClassName={"paginationButton"}
            disabledClassName={"paginationDisable"}
            activeClassName={"paginationActive"}
          />
          <div onClick={(e) => navigate("/result")} className="submit-button">
            {/* submit icon */}
            <AssignmentTurnedInRoundedIcon className="submit-icon" />
            <h2>Submit</h2>
          </div>
        </div>
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

      {timesUp && <TimesUpOverlay />}
    </div>
  );
}

export default Question;
