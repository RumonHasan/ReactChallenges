import { useEffect, useRef, useState } from 'react';

const UseEffectApp = () => {
  const [name, setName] = useState('Yoi');
  const [secondName, setSecondName] = useState('Moeka');
  const [heightButton, setHeightButton] = useState(100);
  const getButtonPosition = useRef(null);
  const firstNamRef = useRef(null);

  useEffect(() => {
    console.log('hello');
  }, [name]);

  const changeName = () => {
    setName('rumon');
  };

  useEffect(() => {
    firstNamRef.current.style.height = `${heightButton}px`;
  }, [heightButton]);

  const changeSecondName = () => {
    setSecondName('Kevin');
    const buttonDimensions = getButtonPosition.current.getBoundingClientRect();

    console.log(buttonDimensions);
  };
  const increaseHeight = () => {
    setTimeout(() => {
      setHeightButton((prevHeight) => prevHeight + 100);
    }, 2000);
  };

  return (
    <div>
      First:{name}, Second: {secondName}
      <button onClick={() => changeName()} ref={firstNamRef}>
        Change Name
      </button>
      <button onClick={() => changeSecondName()} ref={getButtonPosition}>
        Change SecondName
      </button>
      <button onClick={() => increaseHeight()}>Increase height</button>
    </div>
  );
};

export default UseEffectApp;
