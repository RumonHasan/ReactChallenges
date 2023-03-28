import { useState } from 'react';
import './style.css';
const ExpandingBlocks = () => {
  const [blocks, setBlocks] = useState(['A', 'B', 'C']);
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [blockIndex, setBlockIndex] = useState(null);

  const setBlockLocation = (index) => {
    const leftIndex = index;
    setBlockIndex(leftIndex);
  };
  // add new block
  const addNewBlock = () => {
    if (blockIndex !== null && input !== '') {
      let leftSlice = blocks.slice(0, blockIndex + 1);
      let rightSlice = blocks.slice(blockIndex + 1, blocks.length);
      let localBlocks = [...leftSlice, input, ...rightSlice];
      setBlocks(localBlocks);
    }
    setInput('');
  };
  return (
    <div className="app">
      Expanding Bitches
      <div className="blocks">
        {blocks.map((singleBlock, index) => {
          return (
            <>
              <div key={index} className="block">
                {singleBlock}
              </div>
              {index < blocks.length - 1 && (
                <div
                  className="between-block"
                  onClick={() => setBlockLocation(index)}
                >
                  <p>add</p>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div>
        <input
          placeholder="Enter the in between stuff"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addNewBlock()}>Add Block</button>
      </div>
    </div>
  );
};

export default ExpandingBlocks;
