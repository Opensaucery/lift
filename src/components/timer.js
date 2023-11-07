import React, { useState, useEffect } from 'react';
import { StyledNumberInput, IncrementButton, DecrementButton } from './GlobalStyles';

const Timer = ({ initialTime, onTimerEnd }) => {
    const [time, setTime] = useState(initialTime);
    const [editable, setEditable] = useState(false);
    const [userInputTime, setUserInputTime] = useState(initialTime);
    
    // increment and decrement button functions
        const increment = () => setUserInputTime((prevTime) => prevTime + 1);
        const decrement = () => setUserInputTime((prevTime) => prevTime - 1);

    useEffect(() => {
       let timerId;

       if(!editable) {
            // setup interval timer every second
            timerId = setInterval(() => {
                setTime((prevTime) => { // updates state of time, take function as an argument 
                    const newTime = prevTime -1; // simple decuction for timer
                    if (newTime <= 0) {
                        clearInterval(timerId); // stops at zero
                        onTimerEnd(); // sets timer to inactive
                    }
                    return newTime > 0 ? newTime : 0;
                })
            }, 1000);
       }

        return () => clearInterval(timerId);
    }, [editable, onTimerEnd]);

    const handleTimeChange = (e) => {
        setUserInputTime(e.target.value);
    }

    const saveNewTime = () => {
        setTime(parseInt(userInputTime, 10) || 0);
        setEditable(false);
    }


    return (
        <div>
            {editable ? (
                <div>
                    <StyledNumberInput
                        type="number"
                        value={userInputTime}
                        onChange={handleTimeChange}
                        min="0"
                        max="300"
                    />
                    <IncrementButton onClick={increment}>+</IncrementButton>
                    <DecrementButton onClick={decrement}>-</DecrementButton>
                    <button onClick={saveNewTime}>Save</button>            
                </div>
            ) : (
                <div>
                    Rest time: {time}s
                    <button onClick={() => setEditable(true)}>Edit Timer</button>
                </div>
            )}
        </div>
    )
};


export default Timer;
