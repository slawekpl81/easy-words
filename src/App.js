import { useState } from "react";
import "./App.css";

import WordApp from "./components/WordApp";
import { getRandomInd } from "./components/random";
import words from "./data/data";

function App() {
  const [points, setPoints] = useState(0);
  const [series, setSeries] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [id, setId] = useState(getRandomInd());
  const [usedQuestions, setUsedQuestions] = useState([]);

  function getQuestion() {
    let tempId = getRandomInd();
    while (usedQuestions.includes(tempId)) {
      tempId = getRandomInd();
    }
    setId(tempId);
    setUsedQuestions([...usedQuestions, tempId]);
    if (usedQuestions.length === 20) {
      setUsedQuestions([]);
    }
    console.log(usedQuestions);
  }

  return (
    <div className="App">
      <div className="container border">
        <div className="row">
          <div className="col m-1">
            <h2 className="alert alert-warning">Easy words</h2>
          </div>
        </div>
        {/* <div className="row">
          <div className="col col-sm white">
            <p className="alert alert-success"> POINTS:{points}</p>
          </div>
          <div className="col col-sm white">
            <p className="alert alert-success">
              Run of luck:{series} Best series:{bestSeries}
            </p>
          </div>
        </div> */}

        <div className="row">
          <div className="col m-1 d-flex justify-content-center">
            <WordApp
              id={id}
              setPoints={setPoints}
              points={points}
              series={series}
              setSeries={setSeries}
              correct={correct}
              setCorrect={setCorrect}
            />
          </div>
          <div className="col">
            <div className="col col-sm white mt-5 mb-5">
              <p className="alert alert-danger h1"> POINTS: {points}</p>
            </div>

            <div className="col col-sm white mt-5 mb-5">
              {correct!==0 &&
              <p className="alert alert-light h1"> {correct ? 'OK' : 'WRONG'}</p>
}
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

        <footer className="white card-footer">
          <p className="white">data base: {words.length}words</p>
          <div class="text-center p-3">© 2021 Copyright: sławek jona</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
