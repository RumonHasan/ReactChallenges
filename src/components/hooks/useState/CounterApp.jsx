import { useState } from 'react';

const BasicCounterApp = () => {
  // counter
  const [counter, setCounter] = useState(0);
  // basic way to increase counter using a call back function and update the previous state
  const increaseCounter = () => {
    setCounter((counter) => counter + 1);
  };
  const decreaseCounter = () => {
    setCounter((counter) => counter - 1);
  };
  // basic boolean
  const [showSomething, setShowSomething] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Basic Counter:</h2>
          <button
            style={{ height: 50 }}
            onClick={() => setShowSomething((prevState) => !prevState)}
          >
            {showSomething
              ? 'Counter is Now Visible'
              : 'Counter is now Not Visible'}
          </button>
        </div>
        {showSomething && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={decreaseCounter}>-Increase Counter Value</button>
            <span style={{ paddingLeft: 10, paddingRight: 10 }}>{counter}</span>
            <button onClick={increaseCounter}>+ Decrease Counter Value</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicCounterApp;
