import React, { useState, useEffect } from "react";

import words from "../data/data";
import { getRandomInd } from "./random";

export default function WordApp(props) {
  const [answers, setAnswers] = useState([words[props.id].alt]);
  const [result, setResult] = useState(0);
  const classStart = "btn btn-primary m-1";
  // const classOk = "btn btn-success m-1";
  // const classWrong = "btn btn-danger m-1";
  const [help, setHelp] = useState(false);

  function getAnswers() {
    let temp = new Set([words[props.id].alt]);
    for (let i = 0; i < 5; i++) {
      const id = getRandomInd();
      temp.add(words[id].alt);
    }
    return [...temp].sort((a, b) => 0.5 - Math.random());
  }

  function reset() {
    setAnswers(getAnswers());
    setResult(0);
    setHelp(false);
    props.setCorrect(0);
  }

  useEffect(reset, [props.id]);

  function handleAnswer(event) {
    if (event.target.value === words[props.id].alt) {
      props.setPoints(props.points + 1);
      props.setSeries(props.series + 1);
      // if (props.series >= props.bestSeries) {
      //   props.setBestSeries(props.series);
      // }
      //   event.target.classList = classOk;
      setResult(true);
      props.setCorrect(true);
    } else {
      props.setPoints(props.points - 1);
      props.setSeries(0);
      //   event.target.classList = classWrong;
      setResult(false);
      props.setCorrect(false);
    }
  }

  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      <img
        src={words[props.id].url}
        className="card-img-top"
        alt={words[props.id].alt}
      />
      <div className="card-body">
        <p>
          Category:
          {words[props.id].tag.map((tag) => " " + tag + " ")}
        </p>
        <div>
          <p className="text-lg-center text-decoration-underline">
            Your answer:
          </p>
          {result !== 0 && (
            <p className="badge bg-dark">{result === true ? "OK" : "WRONG"}</p>
          )}
        </div>

        {answers.map((answer) => (
          <button
            key={answer}
            className={classStart}
            onClick={(e) => handleAnswer(e)}
            value={answer}
          >
            {answer}
          </button>
        ))}
      </div>
      <div>
        <button className="btn btn-info btn-sm" onClick={() => setHelp(!help)}>
          help ?
        </button>
        {help && <p>{words[props.id].pl}</p>}
      </div>
      <p className="card-text">
        <a href={words[props.id].author}>Photo Creator</a>
      </p>
    </div>
  );
}
