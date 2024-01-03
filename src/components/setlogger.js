import React, { useState, useEffect } from 'react';
import { StyledNumberInput, IncrementButton, DecrementButton } from './GlobalStyles';
import { Button, GlobalStyle } from './GlobalStyles';

const SetLogger = ({ setNumber, onLogSet, initialReps, initialWeight, onTimerReset, isCurrentSet }) => {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(initialWeight || 0);

   // increment and decrement button functions
   const increment = () => setReps((prevReps) => prevReps + 1);
   const decrement = () => setReps((prevReps) => prevReps - 1);

  // Function to log a set
  const handleLogSet = () => {
    onLogSet(reps, weight); // Logs the set with the current number of reps and weight
    onTimerReset(); // Trigger a timer reset
    setReps(0); // Reset the rep count after logging the set
    
    // Google Analytics event tracking
    if (window.gtag) {
      window.gtag('event', 'Log Set', {
          'event_category': 'Other',
          'event_label': '_TsfCKPR34QZELCJ39Uq',
          'value': 1 // You can customize this value
      });
    }
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
                    reps
            <div className='increment-decrement'>
              <IncrementButton className='btn-plusminus' onClick={increment}>+</IncrementButton>
              <DecrementButton className='btn-plusminus' onClick={decrement} min="0">-</DecrementButton>
            </div>
            <br></br>
            <div></div>
            <br></br>
            <StyledNumberInput
                    type="number"
                    value={weight}
                    onFocus={handleFocus}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    onKeyDown={handleKeyPress}
                    min="0"
                    />
                    kg lifted
            <Button primary onClick={handleLogSet}>Log Set</Button>
        
      </div>
  );
};

export default SetLogger;
