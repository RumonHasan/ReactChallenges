import { useEffect, useRef, useState, createRef } from 'react';
// data for states and multi selecti
import { usStates } from '../../../data/states';
import './styles.css';
const StateMultiSelect = () => {
  const [dropDownDisplay, setDropDownDisplay] = useState(true);
  const [states, setStates] = useState(usStates);
  const [selectedStates, setSelectedStates] = useState([]);
  const [tippyCount, setTippyCount] = useState(0); // for counting selected states when they exceed 4
  const [tippyChips, setTippyChips] = useState([]);
  const [chipRefs, setChipRefs] = useState([]);
  const [showTippy, setShowTippy] = useState(false);

  const [getDimensionsContainer, setGetDimenionsContainer] =
    useState(undefined);
  const chipContainerRef = useRef(null);
  // using reduce method to set all the object abbreviations to false, remember to declare the ending data type
  const [abbrevCheck, setAbbrevCheck] = useState(
    states.reduce(
      (object, currentState) => ({
        ...object,
        [currentState.abbreviation]: false,
      }),
      {}
    )
  );
  // checks the states
  const handleChecked = (event, abbreviation) => {
    // abbreviation is being used a key to update the abbrev check object
    setAbbrevCheck((prevObject) => ({
      ...prevObject,
      [abbreviation]: event,
    }));
  };
  // getting selected object list count
  const selectedListCount = () => {
    let objVals = Object.values(abbrevCheck);
    let trueVals = objVals.filter((value) => value === true);
    return trueVals.length;
  };

  // updating selected states
  useEffect(() => {
    let array = [];
    for (let [key, value] of Object.entries(abbrevCheck)) {
      value && array.push(key);
    }
    // chip states for selected items
    let maxChipCount = 5;
    if (array.length < maxChipCount) {
      setSelectedStates(array);
      setTippyChips([]);
    } else if (array.length >= maxChipCount) {
      // logic for setting a limit to chips in state of chippy states.
      const newArray = array.slice(maxChipCount - 1, array.length);
      setTippyChips(newArray);
      setSelectedStates(array.slice(0, 4));
    }
  }, [abbrevCheck]);

  // update tippy chip length
  useEffect(() => {
    setTippyCount(tippyChips.length);
  }, [tippyChips]);

  // get dimensions of the parent
  useEffect(() => {
    let dimenions = chipContainerRef.current.getBoundingClientRect();
    let rightBorder = dimenions.right;
    setGetDimenionsContainer(rightBorder);
  }, []);

  // creating chip refs
  useEffect(() => {
    setChipRefs((chipRefs) =>
      Array(selectedStates.length)
        .fill()
        .map((_, i) => chipRefs[i] || createRef())
    );
  }, [selectedStates.length]);

  // chip component
  const chipComponent = (abbreviation, index) => {
    return (
      <div
        key={index}
        style={{
          padding: 5,
          border: '1px solid black',
          borderRadius: 4,
          margin: 4,
        }}
      >
        {abbreviation}
      </div>
    );
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="dropdown-container"
    >
      <button
        className="button"
        onClick={() =>
          setDropDownDisplay((prevDropDownDisplay) => !prevDropDownDisplay)
        }
      >
        --Select Multiple States --{' '}
        {selectedListCount() === 0
          ? 'nothing selected yet'
          : selectedListCount()}
      </button>
      {dropDownDisplay && (
        <div className="state-list-container">
          {states.map((singleState, index) => {
            const { name, abbreviation } = singleState;
            return (
              <div key={abbreviation}>
                <input
                  checked={abbrevCheck[abbreviation]}
                  onChange={(e) =>
                    handleChecked(e.target.checked, abbreviation)
                  }
                  type="checkbox"
                />
                <label
                  className={
                    abbrevCheck[abbreviation] ? 'checked' : 'unchecked'
                  }
                >
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
        <h3>Chips: {tippyCount + selectedStates.length}</h3>
        <div style={{ display: 'flex' }}>
          <div
            ref={chipContainerRef}
            style={{
              display: 'flex',
              border: '2px solid black',
              maxWidth: 200,
              width: 200,
              height: 40,
              overflow: 'hidden',
            }}
          >
            {selectedStates.map((state, index) => {
              return (
                <div key={index} ref={chipRefs[index]}>
                  {chipComponent(state, index)}
                </div>
              );
            })}
          </div>

          {tippyCount > 0 && (
            <div style={{ position: 'relative' }}>
              <span>Extra Chips:</span>
              <button
                onMouseEnter={() => setShowTippy(true)}
                onMouseLeave={() => setShowTippy(false)}
                style={{
                  background: 'none',
                  borderRadius: '50%',
                  padding: 10,
                  border: 'none',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  backgroundColor: 'red',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {tippyCount}
              </button>

              {showTippy && (
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 0,
                    flexDirection: 'column',
                    background: 'gray',
                    width: 100,
                  }}
                >
                  {tippyChips?.map((tippy, index) => {
                    return (
                      <div key={index} style={{ color: 'white', padding: 4 }}>
                        {tippy}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateMultiSelect;
