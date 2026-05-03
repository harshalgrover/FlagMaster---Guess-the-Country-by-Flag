import './StartPage.css';

const StartPage = () => {
  return (
    <div className="start-card">
      <h1>🌍 FlagMaster</h1>
      <p>Test your knowledge of world flags!</p>
      <div className="earth-emoji">🌎</div>
      <button className="play-btn">
        Start Quiz
      </button>
    </div>
  );
};

export default StartPage;