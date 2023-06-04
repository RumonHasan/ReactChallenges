import React, { useEffect, useState } from 'react';

const Sidepopup = () => {
  const [showMenu, setShowMenu] = useState(false);
  const sideWidthMax = 30;
  const [sideWidth, setSideWidth] = useState(0);

  // adding animation everytime there is a change
  useEffect(() => {
    if (showMenu) {
      const animationTimeout = setInterval(() => {
        if (sideWidth === sideWidthMax) {
          return;
        } else {
          setSideWidth((prevWidth) => prevWidth + 2);
        }
      }, 10);
      return () => clearInterval(animationTimeout);
    } else {
      const animationTimeout = setInterval(() => {
        if (sideWidth === 0) {
          return;
        } else {
          setSideWidth((prevWidth) => prevWidth - 2);
        }
      }, 10);
      return () => clearInterval(animationTimeout);
    }
  }, [showMenu, sideWidth]);

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  const dummyMenu = ['Home', 'Service', 'Counter', 'Something'];
  return (
    <div
      style={{
        height: '70vh',
        width: '70vw',
        position: 'relative',
        border: '2px solid white',
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: `${sideWidth}%`,
          height: '100%',
          background: 'gray',
          transition: '450ms',
          position: 'relative',
        }}
      >
        {dummyMenu.map((item) => (
          <span style={{ padding: 5 }}>{item}</span>
        ))}
      </div>

      <button
        style={{ width: '60px', height: '40px' }}
        onClick={() => openMenu()}
      >
        Open Menu
      </button>
    </div>
  );
};

export default Sidepopup;
