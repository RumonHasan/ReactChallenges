import { useEffect, useRef, useState } from 'react';
import './style.css';
const MultiStepForm = () => {
  const [formStepperIndex, setFormStepperIndex] = useState(1);
  const stepOneRef = useRef(null);
  const stepTwoRef = useRef(null);
  const stepThreeRef = useRef(null);
  const stepColor = 'blue';
  const formContainerRef = useRef(null);

  // default step color
  useEffect(() => {
    switch (formStepperIndex) {
      case 1:
        updateSizeRef(600);
        updateStepperBg(stepOneRef, [stepTwoRef, stepThreeRef]);
        break;
      case 2:
        updateSizeRef(800);
        updateStepperBg(stepTwoRef, [stepOneRef, stepThreeRef]);
        break;
      case 3:
        updateSizeRef(600);
        updateStepperBg(stepThreeRef, [stepOneRef, stepTwoRef]);
        break;
      default:
        break;
    }
  }, [formStepperIndex]);
  // update ref size
  const updateSizeRef = (size) => {
    formContainerRef.current.style.width = `${size}px`;
  };

  // updating background color of refs
  const updateStepperBg = (ref, otherRefs) => {
    resetStepRefsBg(otherRefs);
    const stepRef = ref.current;
    stepRef.style.background = stepColor;
  };
  const resetStepRefsBg = (refs) => {
    return refs.map((ref) => {
      const element = ref.current;
      return (element.style.background = '');
    });
  };
  // form states
  const [formOneInputs, setFormOneInputs] = useState({
    name: '',
    place: '',
    age: '',
  });
  const [formTwoInputs, setFormTwoInputs] = useState({
    name: '',
    address: '',
    age: '',
  });
  const [formThreeInputs, setFormThreeInputs] = useState({
    name: '',
    country: '',
    age: '',
  });
  // form step functions
  const nextStep = () => {
    if (formStepperIndex === 3) {
      setFormStepperIndex(1);
    } else {
      setFormStepperIndex((prevStep) => {
        return prevStep + 1;
      });
    }
  };
  const prevStep = () => {
    if (formStepperIndex === 1) {
      setFormStepperIndex(1);
    } else {
      setFormStepperIndex((prevStep) => prevStep - 1);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      MultiStep Form
      <div className="form-container" ref={formContainerRef}>
        <div className="form-headers">
          <h3>Step {formStepperIndex}</h3>
          <div className="progress-container">
            <div className="progress-bar" ref={stepOneRef}></div>
            <div className="progress-bar" ref={stepTwoRef}></div>
            <div className="progress-bar" ref={stepThreeRef}></div>
          </div>
        </div>
        <div className="form">
          {formStepperIndex === 1 && (
            <div className="form-one single-form">
              <h3>Form : {formStepperIndex}</h3>
              <input className="input" placeholder="enter something" />
              <input className="input" placeholder="enter something" />
              <input className="input" placeholder="enter something" />
            </div>
          )}
          {formStepperIndex === 2 && (
            <div className="form-one single-form">
              <h3>Form : {formStepperIndex}</h3>
              <div style={{ display: 'flex' }}>
                <input className="input" placeholder="enter something" />
                <input className="input" placeholder="enter something" />
              </div>
              <div style={{ display: 'flex' }}>
                <input className="input" placeholder="enter something" />
                <input className="input" placeholder="enter something" />
              </div>
              <textarea />
            </div>
          )}
          {formStepperIndex === 3 && (
            <div className="form-one single-form">
              <h3>Form : {formStepperIndex}</h3>
              <input className="input" placeholder="enter something" />
              <input className="input" placeholder="enter something" />
              <input className="input" placeholder="enter something" />
            </div>
          )}
        </div>
        <div className="form-actions">
          {formStepperIndex > 1 && (
            <button className="form-button" onClick={() => prevStep()}>
              Previous
            </button>
          )}
          {formStepperIndex < 3 && (
            <button className="form-button" onClick={() => nextStep()}>
              Next
            </button>
          )}
          {formStepperIndex === 3 && (
            <button className="form-button">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
