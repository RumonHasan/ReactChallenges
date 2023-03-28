import React, { useState } from 'react';
import { gameData } from './GameData';

const Memory = () => {
  const [gameBoard, setGameBoard] = useState(gameData);
  const [flipCount, setFlipCount] = useState(1);
  const [score, setScore] = useState(0);

  // styles;
  const gameBlock = {
    margin: 10,
    padding: '50px',
    background: 'gray',
    fontSize: 30,
    cursor: 'pointer',
  };

  // making game board
  const gameBoardMatrix = () => {
    return (
      <React.Fragment>
        {gameBoard.map((row, index) => (
          <div style={{ display: 'flex', margin: 10 }} key={index}>
            {row.map((value, index) => {
              const { name, id, state } = value;
              return (
                <div
                  key={index}
                  style={gameBlock}
                  onClick={() => displayBlock(id, state)}
                >
                  {state ? (
                    <span style={{ fontSize: 50 }}>{name}</span>
                  ) : (
                    <span style={{ fontSize: 50 }}>?</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </React.Fragment>
    );
  };
  // displaying block
  const displayBlock = (id, state) => {
    let prevBoard = [...gameBoard];
    for (let rowIndex in prevBoard) {
      for (let colIndex in prevBoard[rowIndex]) {
        if (prevBoard[rowIndex][colIndex].id === id) {
          const newBoardObject = {
            ...prevBoard[rowIndex][colIndex],
            state: true,
          };
          prevBoard[rowIndex][colIndex] = newBoardObject;
        }
      }
    }
    setGameBoard(prevBoard);
    if (flipCount === 2) {
      console.log('do something');
      let checkBoard = [...gameBoard];
      checkBoardMatched(checkBoard);
    } else {
      setFlipCount((oldCount) => oldCount + 1);
    }
  };

  const checkBoardMatched = (board) => {
    console.log(board);
    let pairCheck = [];
    for (let rowIndex in board) {
      for (let colIndex in board[rowIndex]) {
        if (board[rowIndex][colIndex].state === true) {
          console.log(board[rowIndex][colIndex]);
          pairCheck.push(board[rowIndex][colIndex]);
        }
      }
    }
    // removing the pairs if they are equal
    if (pairCheck[0].name === pairCheck[1].name) {
      setScore((prevScore) => prevScore + 10);
      let tempBoard = [...board];
      let pairIndex = 0;
      for (let index in tempBoard) {
        for (let secondIndex in tempBoard[index]) {
          if (tempBoard[index][secondIndex].id === pairCheck[pairIndex].id) {
            delete tempBoard[index][secondIndex];
            pairIndex++;
          }
        }
        if (pairCheck.length === 0) {
          break;
        }
      }

      setGameBoard(tempBoard);
      setFlipCount(1);
    } else {
      console.log('unmatched');
      changeBoardToDefault();
      setFlipCount(1);
    }
  };
  const changeBoardToDefault = () => {
    let board = gameData;
    for (let index in board) {
      for (let colIndex in board[index]) {
        if (board[index][colIndex].state === true) {
          const newObject = {
            ...board[index][colIndex],
            state: false,
          };
          board[index][colIndex] = newObject;
        }
      }
    }
    console.log(board);
    setGameBoard(board);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex' }}>
        <span>Memory Game</span>
        <span>Score: {score}</span>
      </div>

      <div>{gameBoardMatrix()}</div>
    </div>
  );
};

export default Memory;
