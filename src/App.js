import { useState } from 'react';
import './App.css';
import BasicCounterApp from './components/hooks/useState/CounterApp';
import CodeBlocksApp from './components/CodeEditor/CodeBlocks/CodeBlocksApp';
// game
import Memory from './components/Advanced/MemoryGame/Memory';

const App = () => {
  return (
    <div className="apps">
      <Memory />
    </div>
  );
};
export default App;
