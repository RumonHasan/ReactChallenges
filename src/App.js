import { useState } from 'react';
import './App.css';
import BasicCounterApp from './components/hooks/useState/CounterApp';
import CodeBlocksApp from './components/CodeEditor/CodeBlocks/CodeBlocksApp';

const App = () => {
  return (
    <div className="apps">
      <CodeBlocksApp />
    </div>
  );
};
export default App;
