import React, { useState, useEffect } from "react";
import "./App.css";

import WordApp from "./components/WordApp";
import Users from "./components/Users";
import Footer from "./components/Footer/Footer";
import AwardsModal from './components/Modal/AwardsModal'
import { getRandomInd } from "./components/random";

import useStore from "./zustand/useStore";

import ok from "./img/ok.png";
import cross from "./img/cross.png";

function App() {
  const loadUsers = useStore((state) => state.loadUsers);
  const points = useStore((state) => state.points);
  const answer = useStore((state) => state.answer);
  const setNextId = useStore((state) => state.setNextId);
  const [usedQuestions, setUsedQuestions] = useState([]);

  function getQuestion() {
    let tempId = getRandomInd();
    while (usedQuestions.includes(tempId)) {
      tempId = getRandomInd();
    }
    setNextId(tempId);
    setUsedQuestions([...usedQuestions, tempId]);
    if (usedQuestions.length === 30) {
      setUsedQuestions([]);
    }
    console.log(usedQuestions);
  }
  useEffect(loadUsers, []);

  return (
    <div className="App">
      <div className="container">
        <AwardsModal />
        <div className="row">
          <div className="col m-1">
            <h2 className="alert alert-warning">Easy words</h2>
          </div>
        </div>

        <div className="row">
          <div className="col m-1 d-flex justify-content-center">
            <Users />
          </div>
          <div className="col m-1 d-flex justify-content-center">
            <WordApp />
          </div>
          <div className="col">
            <div className="col col-sm white mt-5 mb-5">
              <p className="alert alert-danger h1"> POINTS: {points}</p>
            </div>

            <div className="col col-sm white mt-5 mb-5">
              {/* {answer !== 0 && (
                <p className="alert alert-light h1">
                  {" "}
                  {answer ? "OK" : "WRONG"}
                </p>
              )} */}
              {answer !== 0 && (
                <p>
                  {" "}
                  {answer ? <img src={ok}></img> : <img src={cross}></img>}
                </p>
              )}
            </div>

            <div className="col m-3">
              <button
                className="btn btn-outline-info btn-lg"
                onClick={getQuestion}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
