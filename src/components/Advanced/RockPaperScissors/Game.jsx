import { useState } from 'react';
import './styles.css';
// images
import rock from './stone.png';
import scissors from './scissors.png';
import paper from './essay.png';
import { auto } from '@popperjs/core';

const Game = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const [winnerText, setWinnerText] = useState('');
  const [winLossStreak, setWinLossStreak] = useState([]);
  const [winner, setWinner] = useState({
    human: false,
    computer: false,
  });
  // winners
  const humanWinner = () => {
    setWinner((prevWinner) => ({
      ...prevWinner,
      human: true,
      computer: false,
    }));
  };
  const computerWinner = () => {
    setWinner((prevWinner) => ({
      ...prevWinner,
      human: false,
      computer: true,
    }));
  };
  const noWinner = () => {
    setWinner((prevWinner) => ({
      ...prevWinner,
      human: false,
      computer: false,
    }));
  };
  // base logic
  const gameLogic = (computerChoice, humanChoice) => {
    if (computerChoice === 'rock' && humanChoice === 'scissors') {
      computerWinner();
    } else if (computerChoice === 'scissors' && humanChoice === 'rock') {
      humanWinner();
    } else if (computerChoice === 'paper' && humanChoice === 'scissors') {
      humanWinner();
    } else if (computerChoice === 'rock' && humanChoice === 'paper') {
      humanWinner();
    } else if (computerChoice === 'paper' && humanChoice === 'rock') {
      computerWinner();
    } else if (computerChoice === 'scissors' && humanChoice === 'paper') {
      computerWinner();
    } else if (computerChoice === 'paper' && humanChoice === 'paper') {
      noWinner();
    } else if (computerChoice === 'rock' && humanChoice === 'rock') {
      noWinner();
    } else if (computerChoice === 'scissors' && humanChoice === 'scissors') {
      noWinner();
    }
  };
  const getWinner = () => {
    let winnerState = { ...winner };
    if (winnerState.computer) {
      setWinnerText('Computer Wins');
      setWinLossStreak((prevWinners) => [...prevWinners, 'Computer > Human']);
    } else if (winnerState.human) {
      setWinnerText('Human Wins');
      setWinLossStreak((prevWinners) => [...prevWinners, 'Computer < Human']);
    } else {
      setWinnerText('No Winner');
      setWinLossStreak((prevWinners) => [...prevWinners, 'Computer == Human']);
    }
  };

  const handleChoice = (choice) => {
    const humanChoice = choice;
    const randomChoiceIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomChoiceIndex];
    gameLogic(humanChoice, computerChoice);
    getWinner();
  };

  return (
    <div className="game-container">
      <h1>Game:{winnerText}</h1>
      <div className="game">
        {choices.map((choice, index) => {
          return (
            <button
              className="button"
              key={index}
              onClick={() => handleChoice(choice)}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <div
        style={{ maxHeight: '300px', overflow: auto, scrollbarColor: 'yello' }}
      >
        {winLossStreak.map((streak, index) => (
          <h5 key={index}>
            {index + 1}: {streak}
          </h5>
        ))}
      </div>
    </div>
  );
};
export default Game;
