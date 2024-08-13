import { useState, useEffect } from 'react'

function Game() {

  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [boxColor, setBoxColor] =  useState("red");

  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(15);
    setGameFinished(false);
  }; 

  const handleBoxClick = () => {
    if(boxColor === "green" && score === 14) {
      setScore(15);
      setGameFinished(true);
    } else if (boxColor === "green") {
      setScore(score + 1);
    } else {
      setGameFinished(true);
    }
  };

  useEffect(() => {
    if(gameStarted && !gameFinished && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameFinished(true);
    }
  }, [gameStarted, gameFinished, timeLeft]);

  useEffect(() => {
    const randomInterval = setInterval(() => {
      setBoxColor(boxColor === "red" ? "green" : "red");
    }, Math.floor(Math.random() * 1000) + 1000)

    return () => clearInterval(randomInterval);
  }, [boxColor]);
  
  return (
    <>
      <div className='wrapper'>
        {(!gameStarted || gameFinished) && <button className='btn' onClick={handleStartGame}>Start Game</button>}
        {gameStarted && !gameFinished && <p className='time'>Time left: {timeLeft}s {gameFinished && " - Game Over!"}</p>}
        <h1 className='scoreboard'>Score: {score}</h1>
        {gameStarted && !gameFinished && <div className='box' onClick={handleBoxClick} style={{backgroundColor: boxColor}}></div>}
        {gameFinished && <h2 className='result'>{score < 15 ? 'Game Over!' : 'You win!'}</h2>}
      </div>
    </>
  )
}

export default Game
