import { useState } from 'react';
import './App.css';
import BasicCounterApp from './components/hooks/useState/CounterApp';

const App = () => {
  return (
    <div className="apps">
      <BasicCounterApp />
    </div>
  );
};
export default App;
