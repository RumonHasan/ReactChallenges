import { useState, useRef, useEffect } from 'react';
import './submenuStyles.css';
const MovingSubmenu = () => {
  // useStates
  const [buttonLocations, setButtonLocations] = useState({});
  const [showSubmenu, setShowSubmenu] = useState(false);
  // ref states
  const buttonOneRef = useRef(null);
  const buttonTwoRef = useRef(null);
  const submenuRef = useRef(null);
  // fetching the button dimensions
  const sendButtonLocations = (buttonRef, buttonData) => {
    const dimensions = buttonRef.current.getBoundingClientRect();
    const centerButtonOrigin = (dimensions.left + dimensions.right) / 2;
    const bottomOrigin = dimensions.bottom + 3;
    setButtonLocations({
      centerPos: centerButtonOrigin,
      bottomPos: bottomOrigin,
      buttonData: buttonData,
    });
    setShowSubmenu(true);
  };
  // updating submenu locations locations
  useEffect(() => {
    const submenuDimensions = submenuRef.current;
    submenuDimensions.style.left = `${buttonLocations.centerPos}px`;
    submenuDimensions.style.top = `${buttonLocations.bottomPos}px`;
  }, [buttonLocations]);

  return (
    <div className="container">
      <div className="button-container">
        <button
          onClick={() =>
            sendButtonLocations(buttonOneRef, 'This is Button One Area')
          }
          ref={buttonOneRef}
        >
          Button One
        </button>
        <button
          onClick={() =>
            sendButtonLocations(buttonTwoRef, 'This is Button Two Area')
          }
          ref={buttonTwoRef}
        >
          Button Two
        </button>
      </div>

      <div
        className={showSubmenu ? 'submenu active' : 'submenu active'}
        ref={submenuRef}
      >
        <span>{buttonLocations.buttonData}</span>
      </div>
    </div>
  );
};

export default MovingSubmenu;
