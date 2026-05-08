import { useEffect, useState } from "react";
import "./Game.css";
export default function Game({ onExit }) {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        newQuestion(data);
      });
  }, []);

  function newQuestion(data) {
    setSelected("");
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const opts = shuffled.slice(0, 4);
    setQuestion(opts[0]);
    setOptions(opts.sort(() => Math.random() - 0.5));
  }

  function handleClick(name) {
    if (selected) return;
    setSelected(name);
    if (name === question.name.common) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (count === 10) {
        setFinished(true);
      } else {
        setCount(count + 1);
        newQuestion(countries);
      }
    }, 1000);
  }

  function restartGame() {
    setScore(0);
    setCount(1);
    setFinished(false);
    newQuestion(countries);
  }

  if (!question) {
    return <h2>Loading...</h2>;
  }

  if (finished) {
    return (
      <div className="game-card">
        <h2>Quiz Finished 🎉</h2>

        <h1>
          {score} / 10
        </h1>

        <button onClick={restartGame}>
          Play Again
        </button>

        <button onClick={onExit}>
          Exit
        </button>
      </div>
    );
  }
  

  return (
    <div className="game-card">

      <h3>
        Question {count}/10
      </h3>

      <h3>
        Score: {score}
      </h3>

      <img
        src={question.flags.svg}
        alt="flag"
        width="200"
      />

      <div className="options-grid">
        {options.map((country) => {
          const name = country.name.common;

          let className = "option-btn";

          if (selected) {
            if (name === question.name.common) {
              className += " correct";
            } else if (name === selected) {
              className += " wrong";
            }
          }

          return (
            <button
              key={country.cca3}
              className={className}
              onClick={() => handleClick(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}