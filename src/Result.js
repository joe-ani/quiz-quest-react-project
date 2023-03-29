import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ScoreInfoModal from "./ScoreInfoModal";
import AnswerModal from "./AnswerModal.js";

function Result({ questionCount }) {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isInCorrect, setIsInCorrect] = useState(false);
  const [isUnattempted, setIsUnattempted] = useState(false);
  const optionRef = useRef();
  const innerLineRef = useRef();
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showScoreInfoModal, setShowScoreInfoModal] = useState(false);
  const [correctData, setCorrectData] = useState([]);
  const [inCorrectData, setInCorrectData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  // a json data holding ->> Correct answers and OPtion letter
  const [answerData, setAnswerData] = useState([]);

  // * how to addevent listeners to a node of elements in react 🔍
  const toggle = () => {
    if (isOn) {
      setIsOn(false);
      optionRef.current.style.display = "none";
    } else {
      setIsOn(true);
      optionRef.current.style.display = "flex";
    }
  };
  const getLetter = (i) => {
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

  // const checkLetter = (data, index) => {
  //  data.forEach((opt, idx) => {
  //   console.log(idx)
  //  })
  // };

  const [jsonData, setJsonData] = useState([]);
useEffect(() => {
  jsonData.map((data, index) => {
    data.array.forEach((value, idx) => {
      if (correctData[index] === value) {
        console.log("works")
      }
     })
  });
}, [jsonData])


const [optionLetter, setOptionLetter] = useState([]);
useEffect(() => {
    const options = window.localStorage.getItem("OPTIONS_DATA");
    setOptionsData(JSON.parse(options));
    setJsonData(JSON.parse(options))
    const questions = window.localStorage.getItem("QUESTIONS_DATA");
    JSON.parse(questions).map((data, index) => {
      if (index <= 19) {
        correctData.push(data.correctAnswer);
      }
    });
    console.log(correctData);
    console.log(optionLetter);
  }, []);

  const showModal = () => {
    if (!showAnswerModal) {
      setShowAnswerModal(true);
    }
  };

  const diaplayAnswers = correctData.map((ans, index) => {
    return (
      <div className="question-count">
        <div className="num">{index + 1}</div>
        <div onClick={showModal} className="option1">
          <div className="option-count">{getLetter(index)}</div>
          {ans}
        </div>
      </div>
    );
  });

  const addInfoModalCorrect = () => {
    setShowScoreInfoModal(true);
    setIsCorrect(true);
    setIsInCorrect(false);
    setIsUnattempted(false);
  };
  const addInfoModalIncorrect = () => {
    setShowScoreInfoModal(true);
    setIsCorrect(false);
    setIsInCorrect(true);
    setIsUnattempted(false);
  };
  const addInfoModalUnattempted = () => {
    setShowScoreInfoModal(true);
    setIsCorrect(false);
    setIsInCorrect(false);
    setIsUnattempted(true);
  };

  const removeModal = () => {
    // setShowAnswerModal(false)
  };

  return (
    <div className="result">
      <h1>Result </h1>
      <div className="main-cont">
        <div className="score-container">
          <div className="score">
            <div className="text">
              <BarChartRoundedIcon className="bar-chat" />
              <h2>Your Score</h2>
            </div>
            <div className="chart">
              <div className="outer-line">
                <div ref={innerLineRef} className="inner-line"></div>
              </div>
            </div>
            <div className="percentage-score">10% / 100%</div>
          </div>

          <div className="score-info-container">
            <div className="correct-container">
              <div onClick={addInfoModalCorrect} className="top-cont">
                <h3>3</h3>
                <KeyboardDoubleArrowUpRoundedIcon className="up-arrow" />
              </div>
              <div className="correct-text">Correct</div>
            </div>
            <div className="incorrect-container">
              <div onClick={addInfoModalIncorrect} className="top-cont">
                <h3>17</h3>
                <KeyboardDoubleArrowUpRoundedIcon className="down-arrow" />
              </div>
              <div className="incorrect-text"> Incorrect</div>
            </div>
            <div className="unattempted-container">
              <div onClick={addInfoModalUnattempted} className="top-cont">
                <h3>3</h3>
                <InfoRoundedIcon className="info" />
              </div>
              <div className="unattempted-text">Unattempted</div>
            </div>
          </div>

          <div className="options-cont">
            <div className="message">You Can always try again! </div>
            <div className="option">
              <div onClick={(e) => navigate("/home")} className="home-button">
                <CottageRoundedIcon className="home-icon" />
                Home
              </div>
              <div
                onClick={(e) => navigate("/question")}
                className="retry-button"
              >
                <ReplayRoundedIcon className="retry-icon" />
                Retry
              </div>
            </div>
          </div>
        </div>

        <div className="answers-container">
          <div onClick={toggle} className="answer-view">
            Correct Answers
            {isOn ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
          </div>
          {/* ____________________________ */}
          <div className="main-answer-container">
            <div ref={optionRef} className="option-cont">
              {diaplayAnswers}
              {/* <div className="question-count">
                <div className="num">1</div>
                <div onClick={showModal} className="option1">
                  <div className="option-count">E</div> Lorem ipusm
                </div>
              </div>
              <div className="question-count">
                <div className="num">2</div>
                <div onClick={showModal} className="option1">
                  <div className="option-count">D</div> Lorem ipusm
                </div>
              </div>

              <div className="question-count">
                <div className="num">3</div>

                <div onClick={showModal} className="option1">
                  <div className="option-count">C</div> Lorem ipusm
                </div>
              </div>

              <div className="question-count">
                <div className="num">4</div>
                <div onClick={showModal} className="option1">
                  <div className="option-count">B</div> Lorem ipusm
                </div>
              </div>

              <div className="question-count">
                <div className="num">5</div>
                <div onClick={showModal} className="option1">
                  <div className="option-count">E</div> Lorem ipusm
                </div>
              </div> */}
            </div>
          </div>
          {/* ------------------------------ */}
          <div className="faders">
            <div className="fade1"></div>
            <div className="fade2"></div>
          </div>
        </div>
        {showAnswerModal && (
          <AnswerModal
            setShowAnswerModal={setShowAnswerModal}
            onClick={removeModal}
          />
        )}
        {showScoreInfoModal && (
          <ScoreInfoModal
            setShowScoreInfoModal={setShowScoreInfoModal}
            isCorrect={isCorrect}
            isInCorrect={isInCorrect}
            isUnattempted={isUnattempted}
          />
        )}
      </div>
    </div>
  );
}

export default Result;
