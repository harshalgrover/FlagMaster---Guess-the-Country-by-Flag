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
}