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

  const handleFocus = (event) => event.target.select();
 
  // Update the reps state if initialReps changes (this may happen if the parent component updates the initialReps)
  useEffect(() => {
    setReps(initialReps);
  }, [initialReps]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogSet();
    }
  };

  return (
    <div className='set-log'>
        <GlobalStyle />
        <label>Set #{setNumber}</label>
          <StyledNumberInput
                type="number"
                value={reps}
                onFocus={handleFocus}
                onChange={(e) => setReps(Number(e.target.value))}
                onKeyDown={handleKeyPress}
                min="0"
            />
        <IncrementButton onClick={increment}>+</IncrementButton>
        <DecrementButton onClick={decrement} min="0">-</DecrementButton>
        <Button primary onClick={handleLogSet}>Log Set</Button>
      </div>
  );
};

export default SetLogger;
