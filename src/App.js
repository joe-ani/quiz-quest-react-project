import "./App.css";
import Home from "./Home.js";
import Load from "./Load.js";
import Question from "./Question.js";
import {
  BrowserRouter as Router,    
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { useState } from "react";
import Result from "./Result";
import QuizQuestions from "./QuizQuestions.js";
import { createContext } from "react";


function App() {
  //  set a count down of 5 seconds after wards set showpage to true
  const [showPage, setShowPage] = useState(false);
  const [time, setTime] = useState()
  const [timeDuration, setTimeDuration] = useState()
  // const AppContext = createContext()

  // Timer
  let count = 0;
  const counter = () => {
    if (count === 2) {
      setShowPage(true);
    }
    if (count < 2) {
      count++;
    }
  };

  setInterval(counter, 1000);
  return (
    <Router>
      <div className="App">
        <Routes>
          {!showPage && <Route path="/" element={<Load />} />}
          {showPage && <Route path="/" element={<Home setTime={setTime} setTimeDuration={setTimeDuration} />} />}
          <Route path="question" element={<Question time={time} timeDuration={timeDuration} setTime={setTime} setTimeDuration={setTimeDuration} />} />
          <Route path="/home" element={<Home setTime={setTime} setTimeDuration={setTimeDuration}/> }/>
          <Route path="/result" element={<Result/> }/>
          <Route path="/test" element={<QuizQuestions/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
