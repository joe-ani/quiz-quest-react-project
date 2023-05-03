import React, { useRef } from "react";
import "./Question.css";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TimesUpOverlay from "./TimesUpOverlay.js";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SkelentonLoader from "./SkeletonLoader.js";
import PopUp from "./PopUp.js";
import _ from "lodash";

function Question({
  time,
  timeDuration,
  setTime,
  setTimeDuration,
  questionCount,
  setQuestionCount,
  selectedOption,
  setSelectedOption,
  setQuestionsData,
}) {
  const navigate = useNavigate();
  const linkRef = useRef();
  const arrowRef = useRef();
  const textRef = useRef();
  const elem1Ref = useRef(); //-->> Fix overlapping
  const elem2Ref = useRef();
  const [showPop, setShowPop] = useState(false);
  const [isPrevEnd, setIsPrevEnd] = useState(false);
  const [isNextEnd, setIsNextEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [timingDuration, setTimingDuration] = useState();
  const [questions, setQuestions] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [optionsArr, setOptionsArr] = useState([]);
  const [isResult, setIsResult] = useState(true);
  // *Test Data-----------------------------------****
  const [mockQuestions, setMockQuestions] = useState([]);
  // *--------------------------------------------****
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 1;
  const pagesVisited = pageNumber * userPerPage;
  const pageCount = Math.ceil(questionCount / userPerPage);

  const displayQuestion = mockQuestions
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((qes, i) => {
      return <div key={i}>{qes.question}</div>;
    });

  useEffect(() => {
    const questionsData = window.localStorage.getItem("QUESTIONS_DATA");
    if (questionsData) {
      setSelectedOption([]);
      setMockQuestions(JSON.parse(questionsData));
      setQuestionsData(JSON.parse(questionsData));
      window.localStorage.setItem("RESULT_DATA", questionsData);
      JSON.parse(questionsData).forEach((data) => {
        data.incorrectAnswers.push(data.correctAnswer);
        const myObj = {
          options: _.shuffle(data.incorrectAnswers),
        };
        // if (mockOptions.length <= pageCount) {
        optionsArr.push(myObj);
        // }
      });
      window.localStorage.setItem("OPTIONS_DATA", JSON.stringify(optionsArr));
      // setOptionObjs(optionsArr);
    }
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
    } else if (i === 4) {
      return "E";
    }
  };

  const [selectedOptionIndex, setSelectedOptionIndex] = useState();
  // const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [pagesSelected, setPagesSelected] = useState([]);
  let disableOptions = true;

  const checkOptions = (index, option) => {
    // keep track of page with selected option
    textRef.current.classList.remove("animate-text");
    textRef.current.innerText = "** Carefully answer each question **";
    pagesSelected.push(index + pageCount * pageNumber);
    selectedOption.push(option);
    setSelectedOptionIndex(index + pageCount * pageNumber);
    selectedOptions.push(selectedOptionIndex);
    // moves pagination by one page
    setTimeout(() => {
      if (pageNumber < pageCount - 1) {
        setPageNumber(pageNumber + 1);
      }
    }, 300);
  };

  useEffect(() => {
    optionsArr.slice(pagesVisited, pagesVisited + userPerPage).map((ans) => {
      setOptionsData(ans.options);
    });
  }, [pageNumber]);

  const indexArr = [];

  const runTextAmimate = () => {
    textRef.current.classList.add("animate-text");
    textRef.current.innerText = "** You can't change your answer **";
  };

  useEffect(() => {
    // keep track of page with selected option
    pagesSelected.forEach((val) => {
      if (indexArr.includes(val)) {
        disableOptions = false;
      }
    });
  }, [indexArr, pageNumber]);

  const displayOptions = optionsData.map((data, index, arr) => {
    let isSelected;
    indexArr.push(index + pageCount * pageNumber);
    selectedOptions.forEach((data) => {
      if (data === index + pageCount * pageNumber) {
        isSelected = true;
      }
    });
    return (
      <div
        key={index}
        onClick={() =>
          disableOptions ? checkOptions(index, data) : runTextAmimate()
        }
        className={`option ${
          isSelected || selectedOptionIndex === index + pageCount * pageNumber
            ? "selected"
            : ""
        }`}
      >
        <div
          key={index}
          className={`option-count ${
            isSelected || selectedOptionIndex === index + pageCount * pageNumber
              ? "selected"
              : ""
          }`}
        >
          {getIndex(index)}
        </div>
        {data}
      </div>
    );
  });

  useEffect(() => {
    if (pageNumber + 1 == 1) {
      setIsPrevEnd(true);
    } else if (pageNumber + 1 > 1) {
      setIsPrevEnd(false);
    }
    if (pageNumber + 1 == pageCount) {
      setIsNextEnd(true);
    } else if (pageNumber + 1 < pageCount) {
      setIsNextEnd(false);
    }
  }, [pageNumber]);

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      textRef.current.classList.remove("animate-text");
      textRef.current.innerText = "** Carefully answer each question **";
    }
  };
  const nextPage = () => {
    if (pageNumber < pageCount - 1) {
      setPageNumber(pageNumber + 1);
      textRef.current.classList.remove("animate-text");
      textRef.current.innerText = "** Carefully answer each question **";
    }
  };

  // ADD AUIDO
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    const audioElement = document.getElementById("audio");
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [timer, setTimer] = useState();
  const [second, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  // timer
  useEffect(() => {
    if (!loading) {
      setTimer(
        `${minute.toString().padStart(2, "0")}:${second
          .toString()
          .padStart(2, "0")}`
      );
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
  }, [second, minute, loading]);
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
    setIsResult(true);
    if (togglePopUp === false) {
      setTogglePopUp(true);
    } else {
      setTogglePopUp(false);
    }
  };

  useEffect(() => {
    const timeData = window.localStorage.getItem("TIME_DATA");
    const durationData = window.localStorage.getItem("DURATION_DATA");
    const questionCountData = window.localStorage.getItem("QUESTION_COUNT");
    setQuestionCount(JSON.parse(questionCountData));
    setTimeDuration(JSON.parse(durationData));
    setTime(JSON.parse(timeData));
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
          "https://the-trivia-api.com/api/questions?limit=50"
        );
        setLoading(false);
        window.localStorage.setItem(
          "QUESTIONS_DATA",
          JSON.stringify(response.data)
        );
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
        <img className="top-logo" src="images/Qquestion.png" alt="Logo" />
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
              {timer} /
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
        {loading && <SkelentonLoader />}
        {!loading && (
          <div className="question-container2">
            <audio autoPlay id="audio" src="music/audio2.mp3" />
            <button className="playBtn" onClick={handlePlayPause}>
              {isPlaying ? (
                <VolumeUpRoundedIcon className="wave-on" />
              ) : (
                <VolumeOffRoundedIcon className="wave-off" />
              )}
            </button>
            <div className={`question-cont ${loading ? "show-skeleton" : ""}`}>
              <h2>Question {pagesVisited + 1}:</h2>
              <div className="question-data">{displayQuestion}</div>
            </div>
            <div ref={elem1Ref} className="option-cont">
              <h2>Options</h2>
              <div className="option-grid">{displayOptions}</div>
              <div ref={textRef} className="text">
                ** Carefully answer each question **
              </div>
            </div>
          </div>
        )}

        {togglePopUp && (
          <PopUp isResult={isResult} setTogglePopUp={setTogglePopUp} />
        )}
        <div ref={elem2Ref} className="buttons">
          <div onClick={showPopUp} className="quit-button">
            {/* Quit icon */}
            <HighlightOffRoundedIcon className="quit-icon" />
            <h2 style={{ userSelect: "none" }}>Quit</h2>
          </div>
          <ReactPaginate
            previousLabel={
              <ArrowLeftRoundedIcon
                onClick={prevPage}
                className={`left-icon ${isPrevEnd ? "prev-end" : ""}`}
              />
            }
            nextLabel={
              <ArrowLeftRoundedIcon
                onClick={!loading && nextPage}
                className={`right-icon ${isNextEnd ? "next-end" : ""}`}
              />
            }
            pageCount={pageCount}
            previousClassName={"prevClass"}
            nextClassName={"nextClass"}
            containerClassName={"paginationButton"}
          />
          <div
            onClick={(e) => {
              if (!loading && selectedOption.length !== 0) {
                // or if selectedOption arr is not empty
                navigate("/result");
              } else if (selectedOption.length < 1) {
                if (!loading) {
                  setIsResult(false);
                  setTogglePopUp(true);
                }
              }
            }}
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
