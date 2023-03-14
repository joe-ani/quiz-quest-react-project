import React, { useRef } from "react";
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
import SkelentonLoader from "./SkeletonLoader.js";
import PopUp from "./PopUp.js";

// "https://the-trivia-api.com/api/questions?limit=20"

function Question({
  time,
  timeDuration,
  setTime,
  setTimeDuration,
  questionCount,
  setQuestionCount,
}) {
  const navigate = useNavigate();
  const linkRef = useRef();
  const arrowRef = useRef();
  const [showPop, setShowPop] = useState(false);
  const [second, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [options, setOptions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [timingDuration, setTimingDuration] = useState();
  // Test Data-----------------------------------****
  const [mockQuestions, setMockQuestions] = useState([]);
  const [mockOptions, setMockOptions] = useState([]);
  const [mockAnswers, setMockAnswers] = useState([]);
  const [mockCorrectAnswer, setMockCorrectAnswer] = useState();
  // --------------------------------------------****
  const userPerPage = 1;
  const pagesVisited = pageNumber * userPerPage;

  const displayQuestion = mockQuestions
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((qes) => {
      return <div>{qes.question}</div>;
    });

  // *ORIGINAL
  // const displayQuestion = questions
  //   .slice(pagesVisited, pagesVisited + userPerPage)
  //   .map((qes) => {
  //     return <div>{qes.question}</div>;
  //   });

  useEffect(() => {
    const questionsData = window.localStorage.getItem("QUESTIONS_DATA");
    setMockQuestions(JSON.parse(questionsData));
    JSON.parse(questionsData).forEach((data) => {
      // console.log("running loop");
      data.incorrectAnswers.push(data.correctAnswer);
      setMockAnswers(data.incorrectAnswers);
      const myObj = {
        options: data.incorrectAnswers,
      };
      // if (mockOptions.length <= 19) {
      mockOptions.push(myObj);
      // }
    });
    // console.log(mockOptions);
  }, []);

  const getIndex = (i) => {
    if (i === 0) {
      return "A";
    } else if (i === 1) {
      return "B";
    } else if (i === 2) {
      return "C";
    } else if (i === 3) {
      return "D";
    }
  };

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const checkOptions = (e) => {
    // console.log("in page", pageNumber + 1, "option selected is⬇️");
    setSelectedOption(e.target.innerText.split("").slice(2).join(""));

    setTimeout(() => {
      setPageNumber(pageNumber + 1); //->> BUGG⚠️
    }, 300);

    // console.log(e.target.innerText.split("").slice(2, -1).join(""));
  };

  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    mockOptions.slice(pagesVisited, pagesVisited + userPerPage).map((ans) => {
      setOptionsData(ans.options); //->> shuffle array data
    });
  }, [pageNumber]);

  const displayOptions = optionsData.map((data, index) => {
    return (
      <div key={index} onClick={checkOptions} className="option">
        <div key={index} className="option-count">
          {getIndex(index)}
        </div>
        {data}
      </div>
    );
  });

  // *ORIGINAL
  // const displayOptions = answers.map((ans, index) => {
  //   return (
  //     <div key={index} className="option">
  //       <div className="option-count">{getIndex(index)}</div> {ans}
  //     </div>
  //   );
  // });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    console.log(pageNumber);
  };

  const pageCount = Math.ceil(questionCount / userPerPage);

  // *ORIGINAL
  // const pageCount = Math.ceil(questions.length / userPerPage);

  // ADD AUIDO

  // timer
  useEffect(() => {
    if (loading) {
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
    }
  }, [second, minute]);

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

  const [togglePopUp, setTogglePopUp] = useState(false);
  const showPopUp = () => {
    if (togglePopUp === false) {
      setTogglePopUp(true);
    } else {
      setTogglePopUp(false);
    }
    console.log(togglePopUp);
  };

  useEffect(() => {
    const timeData = window.localStorage.getItem("TIME_DATA");
    const durationData = window.localStorage.getItem("DURATION_DATA");
    const questionCountData = window.localStorage.getItem("QUESTION_COUNT");
    setQuestionCount(JSON.parse(questionCountData));
    setTimeDuration(JSON.parse(durationData));
    setTime(JSON.parse(timeData));
    // console.log(durationData, timeData, "1");
    // console.log(time, timeDuration, "2");
    // console.log(timeData, timeDuration, "3");

    if (timeDuration) {
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
  }, [timeDuration]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://the-trivia-api.com/api/questions?limit=20"
        );
        setLoading(false);
        // const optionsData = window.localStorage.getItem("OPTIONS_DATA");
        window.localStorage.setItem(
          "QUESTIONS_DATA",
          JSON.stringify(response.data)
        );
        window.localStorage.setItem("OPTIONS_DATA", JSON.stringify());
        setQuestions(response.data);
        response.data
          .slice(pagesVisited, pagesVisited + userPerPage)
          .map((qus) => {
            setAnswers(qus.incorrectAnswers);
            setCorrectAnswer(qus.correctAnswer);
          });
        answers.push(correctAnswer);
        setAnswers(answers);
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
        {!loading && <SkelentonLoader />}
        {loading && (
          <div className="question-container2">
            <div className={`question-cont ${loading ? "show-skeleton" : ""}`}>
              <h2>Qustion {pagesVisited + 1}:</h2>

              <p
                style={{
                  margin: "20px",
                  marginTop: "50px",
                  textAlign: "center",
                }}
              >
                {displayQuestion}
              </p>
            </div>
            <div className="option-cont">
              <h2>Options</h2>
              <div className="option-grid">{displayOptions}</div>
              <div className="text">
                ** You can only select an option once **
              </div>
            </div>
          </div>
        )}

        {togglePopUp && <PopUp setTogglePopUp={setTogglePopUp} />}
        <div className="buttons">
          <div onClick={showPopUp} className="quit-button">
            {/* Quit icon */}
            <HighlightOffRoundedIcon className="quit-icon" />
            <h2 style={{ userSelect: "none" }}>Quit</h2>
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
          <div
            onClick={(e) => (!loading ? "" : navigate("/result"))}
            className={`submit-button ${loading ? "submit-false" : ""}`}
          >
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
