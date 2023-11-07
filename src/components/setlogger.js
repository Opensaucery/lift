import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InvisibleInput, StyledNumberInput, IncrementButton, DecrementButton } from './GlobalStyles';
import { Button, GlobalStyle } from './GlobalStyles';

const SetLogger = ({ setNumber, onLogSet, initialReps, onTimerReset }) => {
  const [reps, setReps] = useState(0);

   // increment and decrement button functions
   const increment = () => setReps((prevReps) => prevReps + 1);
   const decrement = () => setReps((prevReps) => prevReps - 1);

  // Function to log a set
  const handleLogSet = () => {
    onLogSet(reps); // Logs the set with the current number of reps
    onTimerReset(); // Trigger a timer reset
    setReps(0); // Reset the rep count after logging the set
  };
 
  // Update the reps state if initialReps changes (this may happen if the parent component updates the initialReps)
  useEffect(() => {
    setReps(initialReps);
  }, [initialReps]);

  return (
    <div>
      <GlobalStyle />
      <label>Set #{setNumber}</label>
      <StyledNumberInput
          type="number"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          min="0"
      />
      <IncrementButton onClick={increment}>+</IncrementButton>
      <DecrementButton onClick={decrement}>-</DecrementButton>
      <Button primary onClick={handleLogSet}>Log Set</Button>
    </div>
  );
};

export default SetLogger;
