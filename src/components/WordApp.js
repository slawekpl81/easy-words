import React, { useState, useEffect } from "react";

import words from "../data/data";
import { getRandomInd } from "./random";

import useStore from "../zustand/useStore";

export default function WordApp() {
  const users = useStore((state) => state.users);
  const id = useStore((state) => state.id);
  const incPoints = useStore((state) => state.incPoints);
  const decPoints = useStore((state) => state.decPoints);
  const answer = useStore((state) => state.answer);
  const resetAnswer = useStore((state) => state.resetAnswer);
  const correctAnswer = useStore((state) => state.correctAnswer);
  const wrongAnswer = useStore((state) => state.wrongAnswer);

  const [answers, setAnswers] = useState([words[id].alt]);
  const classStart = "btn btn-primary m-1";
  // const classOk = "btn btn-success m-1";
  // const classWrong = "btn btn-danger m-1";
  const [help, setHelp] = useState(false);

  function getAnswers() {
    let temp = new Set([words[id].alt]);
    for (let i = 0; i < 5; i++) {
      const foo = getRandomInd();
      temp.add(words[foo].alt);
    }
    return [...temp].sort((a, b) => 0.5 - Math.random());
  }

  function reset() {
    setAnswers(getAnswers());
    setHelp(false);
    resetAnswer();
    // localStorage.setItem("users", JSON.stringify(users));
  }

  useEffect(reset, [id]);

  function handleAnswer(event) {
    if (event.target.value === words[id].alt) {
      incPoints();
      correctAnswer();
    } else {
      decPoints();
      wrongAnswer();
    }
    // console.log(users)
    localStorage.setItem("users", JSON.stringify(users));
  }

  return (
    <div className="card">
      <img src={words[id].url} className="card-img-top" alt={words[id].alt} />
      <div className="card-body">
        <p>
          Category:
          {words[id].tag.map((tag) => " " + tag + " ")}
        </p>
        <div>
          <p className="text-lg-center text-decoration-underline">
            Your answer:
          </p>
          {/* {answer !== 0 && (
            <p className="badge bg-dark">{answer === true ? "OK" : "WRONG"}</p>
          )} */}
        </div>

        {answers.map((ans) => (
          <button
            key={ans}
            className={classStart}
            onClick={(e) => handleAnswer(e)}
            value={ans}
            disabled={answer ? true : false}
          >
            {ans}
          </button>
        ))}
      </div>
      <div>
        <button className="btn btn-info btn-sm" onClick={() => setHelp(!help)}>
          help ?
        </button>
        {help && <p className="p-2">{words[id].pl}</p>}
      </div>
      <p className="card-text author">
        <a href={words[id].author}>Photo by...</a>
      </p>
    </div>
  );
}
