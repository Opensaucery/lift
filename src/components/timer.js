import React, { useState, useEffect } from 'react';
import { StyledNumberInput, TimerValueButton } from './GlobalStyles';

const Timer = ({ initialTime, onTimerEnd }) => {
    const [time, setTime] = useState(initialTime);
    const [editable, setEditable] = useState(false);
    const [userInputTime, setUserInputTime] = useState(initialTime);
    
    // // increment and decrement button functions
    //     const increment = () => setUserInputTime((prevTime) => prevTime + 1);
    //     const decrement = () => setUserInputTime((prevTime) => prevTime - 1);

    // logic for TimerValueButton that is chosen
    // a value will be passed 60, 90, 120 and then that will become the new time. Edit mode should also be turned off.
   
        

    useEffect(() => {
        if(editable) {
            return; // don't start timer if in edit mode
        }

        const timerId = setInterval(() => {
                setTime((prevTime) => { // updates state of time, take function as an argument 
                    const newTime = prevTime -1; // simple decuction for timer function
                    if (newTime <= 0) {
                        clearInterval(timerId); // stops at zero
                        onTimerEnd(); // sets timer to inactive
                        return 0;
                    }
                    return newTime;
                })
            }, 1000);

        return () => clearInterval(timerId);
    }, [editable, onTimerEnd]);

    const handlePresetTime = (presetTime) => {
        setUserInputTime(presetTime);
        setTime(presetTime);
        setEditable(false);
    }

    return (
        <div>
            {editable ? (
                <div>
                    <StyledNumberInput
                        type="number"
                        value={userInputTime}
                        onChange={(e) => setUserInputTime(Number(e.target.value))}
                        // min="0"
                        // max="300"
                    />
                   
                    <button onClick={() => setTime(Number(userInputTime) || initialTime)}>Save</button>            
                </div>
            ) : (
                <div>
                    Rest time: {time}s
                    {/* <button onClick={() => setEditable(true)}>Edit Timer</button> */}
                </div>
            )}
            <div>
                <TimerValueButton onClick={() => handlePresetTime(60)}>60</TimerValueButton>
                <TimerValueButton onClick={() => handlePresetTime(90)}>90</TimerValueButton>
                <TimerValueButton onClick={() => handlePresetTime(120)}>120</TimerValueButton>
            </div>
        </div>
    )
};


export default Timer;
