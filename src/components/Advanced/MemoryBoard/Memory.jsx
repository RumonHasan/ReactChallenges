import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const Memory = () => {
  // main grid state
  const [grid, setGrid] = useState([
    [1, 2, 3, 4],
    [2, 3, 4, 1],
  ]);
  // to control display and hide of grid
  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill('') // mapping each row and feeling with false;
      .map((gridRow) => new Array(grid[0].length).fill(false))
  );
  const [prevClickedNumber, setPrevClickedNumber] = useState({
    number: '',
    location: [],
  });
  const [score, setScore] = useState(0);
  // refs
  const refs = useRef([]);
  const addToRefs = (element, rowIndex, colIndex) => {
    if (element && !refs.current.includes(element)) {
      refs.current.push(element);
    }
  };

  // to check game winner
  useEffect(() => {
    let localRevealedGrid = [...revealedGrid];
    let totalCounter = 8;
    let checkCounter = 0;
    for (let index in localRevealedGrid) {
      for (let colIndex in localRevealedGrid[index]) {
        if (localRevealedGrid[index][colIndex] === true) {
          checkCounter++;
        }
      }
    }
    if (checkCounter === totalCounter) {
      alert('Game finished');
    }
  }, [revealedGrid]);

  const handleClickedTile = (rowIndex, colIndex) => {
    let localGrid = [...grid];
    // receives number on every click
    const clickedNumber = localGrid[rowIndex][colIndex];

    // show the number
    let localRevealedGrid = [...revealedGrid];
    localRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(localRevealedGrid);
    // check for match
    if (prevClickedNumber.number) {
      if (prevClickedNumber.number === clickedNumber) {
        refs.current.map(
          (ref) =>
            Number(ref.textContent) === clickedNumber &&
            ref.style.background === 'green'
        );
        console.log(refs);
        setScore((prevScore) => prevScore + 10);
        setPrevClickedNumber({
          number: '',
          location: [],
        });
      } else {
        setTimeout(() => {
          let localRevealedGrid = [...revealedGrid];
          localRevealedGrid[rowIndex][colIndex] = false;
          localRevealedGrid[prevClickedNumber.location[0]][
            prevClickedNumber.location[1]
          ] = false;
          setRevealedGrid(localRevealedGrid);
        }, 1000);
        // reseting previous clicked
        setPrevClickedNumber({
          number: '',
          location: [],
        });
      }
    } else {
      setPrevClickedNumber((prevObject) => ({
        ...prevObject,
        number: clickedNumber,
        location: [rowIndex, colIndex],
      }));
    }
  };

  return (
    <div className="board-container">
      Memory Game: {score}
      <div className="board">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((number, colIndex) => {
                const revealGridState = revealedGrid[rowIndex][colIndex];
                return (
                  <div
                    ref={addToRefs}
                    className={`block ${revealGridState ? 'highlighted' : ''}`}
                    key={colIndex}
                    onClick={() => handleClickedTile(rowIndex, colIndex)}
                  >
                    {revealGridState && number}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memory;
