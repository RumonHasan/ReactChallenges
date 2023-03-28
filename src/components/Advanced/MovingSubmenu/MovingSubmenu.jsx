import { useState, useRef, useEffect } from 'react';
import './submenuStyles.css';
const MovingSubmenu = () => {
  // useStates
  const [buttonLocations, setButtonLocations] = useState({});
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [originalSubLocation, setOriginalSubLocation] = useState({});

  // original sub location
  useEffect(() => {
    const submenuDimensions = submenuRef.current.getBoundingClientRect();
    const left = submenuDimensions.left;
    const right = submenuDimensions.right;
    const top = submenuDimensions.top;
    const bottom = submenuDimensions.bottom;
    const width = submenuDimensions.width;
    setOriginalSubLocation({
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      width: width,
    });
  }, []);

  // ref states
  const buttonOneRef = useRef(null);
  const buttonTwoRef = useRef(null);
  const submenuRef = useRef(null);
  // fetching the button dimensions
  const sendButtonLocations = (buttonRef, buttonData, params) => {
    const { widthIncrement, heightIncrement } = params;
    const dimensions = buttonRef.current.getBoundingClientRect();
    const centerButtonOrigin = (dimensions.left + dimensions.right) / 2;
    const bottomOrigin = dimensions.bottom + 3;
    setButtonLocations({
      widthIncrement: widthIncrement,
      centerPos: centerButtonOrigin,
      bottomPos: bottomOrigin,
      buttonData: buttonData,
    });
    setShowSubmenu(true);
  };
  // updating submenu locations locations
  useEffect(() => {
    const submenuDimensions = submenuRef.current;
    if (buttonLocations.widthIncrement) {
      submenuDimensions.style.width = `${buttonLocations.widthIncrement}px`;
    } else {
      submenuDimensions.style.width = '300px';
    }
    submenuDimensions.style.left = `${buttonLocations.centerPos - 160}px`;
    submenuDimensions.style.top = `${buttonLocations.bottomPos}px`;
  }, [buttonLocations]);

  // setting default locations
  const setDefaultLocations = () => {
    const submenu = submenuRef.current;
    submenu.style.left = `${originalSubLocation.left}px`;
    submenu.style.top = `${originalSubLocation.top}px`;
    setShowSubmenu(false);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button
          onMouseEnter={() =>
            sendButtonLocations(buttonOneRef, 'You are a bitch!!!', {})
          }
          onMouseLeave={() => setDefaultLocations()}
          ref={buttonOneRef}
        >
          Button One
        </button>
        <button
          onMouseEnter={() =>
            sendButtonLocations(buttonTwoRef, 'Sorry you are also a bitch!!', {
              widthIncrement: 50,
              heightIncrement: 50,
            })
          }
          onMouseLeave={() => setDefaultLocations()}
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
