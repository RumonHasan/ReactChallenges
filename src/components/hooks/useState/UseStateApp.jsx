import { useState } from 'react';
import SecondUseState from './SecondUseState';
const UseStateApp = () => {
  const [getInputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    console.log(e);
    setInputValue(e.target.value);
  };
  console.log(getInputValue);

  return (
    <div>
      input
      <input
        placeholder="Enter something "
        value={getInputValue}
        onChange={handleChange}
      />
    </div>
  );
};
export default UseStateApp;
