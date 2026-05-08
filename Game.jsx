import { useEffect, useState } from "react";
import "./Game.css";
export default function Game({ onExit }) {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
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

  if (!question) {
    return <h2>Loading...</h2>;
  }

}