import { useState } from 'react';
import StartPage from './components/StartPage';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app-container">
      {!gameStarted ? (
        <StartPage onStart={() => setGameStarted(true)} />
      ) : (
        <Game onExit={() => setGameStarted(false)} />
      )}
    </div>
  );
}

export default App;