import { useEffect, useState } from "react";
import "./Game.css";
export default function Game({ onExit }) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
}