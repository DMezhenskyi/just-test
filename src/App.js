import React, { useState } from "react";
import "./App.css";
import { Wizard, Step, Controls } from "react-decision-tree-flow";

function App() {
  const tree = {
    step1: ["step1", "step2"],
    step2: ["step2", "step3", "step4"],
    step3: ["step3", "step1"],
    step4: ["step4", "step2"],
  };
  const [steps, setSteps] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        {steps.map(({ name, navigate }, index) => (
          <button
            onClick={() => {
              setSteps(steps.splice(0, index));
              navigate();
            }}
            key={index}
          >
            {name}
          </button>
        ))}
      </header>
      <Wizard tree={tree} first="step1">
        <Step name="step1">
          <div className="step">
            <h1>I am step 1</h1>
            <br />
            <Controls>
              {({ destinations: { step2, step1 } }) => (
                <button
                  onClick={() => {
                    setSteps([
                      ...steps,
                      { name: "back to step 1", navigate: step1 },
                    ]);
                    return step2();
                  }}
                >
                  Go to Step 2
                </button>
              )}
            </Controls>
          </div>
        </Step>
        <Step name="step2">
          <div className="step">
            <h1>I am step 2</h1>
            <br />
            <Controls>
              {({ destinations: { step3, step4, step2 } }) => (
                <>
                  <button
                    onClick={() => {
                      setSteps([
                        ...steps,
                        { name: "Back to step 2", navigate: step2 },
                      ]);
                      return step3();
                    }}
                  >
                    Go to Step 3
                  </button>
                  <button
                    onClick={() => {
                      setSteps([
                        ...steps,
                        { name: "it is step 2", navigate: step2 },
                      ]);
                      return step4();
                    }}
                  >
                    Go to Step 4
                  </button>
                </>
              )}
            </Controls>
          </div>
        </Step>
        <Step name="step3">
          <div className="step">
            <h1>I am step 3</h1>
            <br />
            <Controls>
              {({ destinations: { step4 }, back }) => (
                <>
                  <button onClick={step4}>Go to Step 4</button>
                  <button onClick={back}>Go back</button>
                </>
              )}
            </Controls>
          </div>
        </Step>
      </Wizard>
    </div>
  );
}

export default App;
