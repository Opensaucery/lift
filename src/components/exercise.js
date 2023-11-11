import React, { useState } from 'react';
import { Button, GlobalStyle, StyledNumberInput } from './GlobalStyles';
import Timer from './timer';
import SetLogger from './setlogger';


const Exercise = ({ workouts, setWorkouts, exerciseOptions, setExerciseOptions }) => {
    console.log("Exercise options in Exercise component:", exerciseOptions);
    const [exerciseType, setExerciseType] = useState('Pushup');
    const [inputValue, setInputValue] = useState(''); // new stage for input field

    // Function to update exercise type from input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Function to update exercise type from dropdown
    const handleDropdownChange = (e) => {
        setExerciseType(e.target.value);
        setInputValue(e.target.value); // Update the input field to match the selection
    }

    const [sets, setSets] = useState([{ setNumber: 1, reps: 0}]);
    const [isTimerActive, setIsTimerActive] = useState(false);
       
    const initialTime = 60; // Set this to whatever your initial time should be
    const [timerDuration, setTimerDuration] = useState(initialTime);
    
    const onLogSet = (setNumber, newReps) => {
        // First, find if today's date already has a workout logged
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = workouts[today] || [];
      
        // Detemine the exercise type to log
        const typeToLog = inputValue || exerciseType;
        console.log("Logging exercise:", typeToLog);

        // Update exercise options if it's a new exercise
        if (inputValue && !exerciseOptions.includes(inputValue)) {
            setExerciseOptions(prevOptions => [...prevOptions, inputValue]);
            setExerciseType(inputValue);
            setInputValue('') // Clear the input field after logging
        }

        // Check if the current exercise already has an entry for today
        let exerciseLogged = todayWorkouts.find(ex => ex.exercise === typeToLog);
      
        if (exerciseLogged) {
            console.log("Appending to existing exercise:", exerciseLogged);
          // If the exercise is already logged today, append the new set to it
          exerciseLogged.sets.push({ setNumber, reps: newReps });
        } else {
            console.log("Creating new exercise entry:", exerciseLogged);
          // If the exercise is not logged today, create a new entry
          exerciseLogged = {
            exercise: typeToLog, 
            sets: [{ setNumber, reps: newReps }],
          };
          console.log("Updated workouts for today:", todayWorkouts);
          todayWorkouts.push(exerciseLogged);
        }
      
        // Update the state with the new or updated workout entry
        setWorkouts(prevWorkouts => {
            const updatedWorkouts = {...prevWorkouts, [today]: todayWorkouts};
            console.log("New workouts state:", updatedWorkouts);
            return updatedWorkouts
        });
      
        // Add a new set to the sets state for the next log
        setSets(prevSets => [...prevSets, { setNumber: setNumber + 1, reps: 0 }]);
        // Restart the timer
        setIsTimerActive(false);
        setTimeout(() => setIsTimerActive(true), 0);
      };
    
        
    // Function to restart the timer
    const restartTimer = () => {
        setIsTimerActive(false); // Stop the timer
        setTimeout(() => setIsTimerActive(true), 0); // Restart the timer
    };
    
    const onTimerEnd = () => {
        // Logic for what happens when the timer ends
        setIsTimerActive(false);
    };
    
    
    return (
        <div>
            <GlobalStyle />
                    <h2>Log your exercise</h2>
                    
                    {/* ComboBox for selecting or typing in exercise type */}
                    <select
                        value={exerciseType}
                        onChange={handleDropdownChange}
                    >
                        {exerciseOptions.map((option, index ) => (
                            <option key={index} value={option}>{option}</option>
                            ))}
                    </select>
                    <input 
                        type='text'
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Or type a new exercise'
                    />

                    {sets.map((set, index) => (
                        <SetLogger
                        key={set.setNumber}
                        setNumber={set.setNumber}
                        initialReps={set.reps}
                        onLogSet={(reps) => onLogSet(set.setNumber, reps)} // Pass reps to onLogSet correctly
                        onTimerReset={restartTimer}
                        />
                        ))}
                    {isTimerActive ? (
                        <Timer 
                        initialTime={timerDuration}
                        onTimerEnd={onTimerEnd}
                        />
                    ) : (
                        <>
                            <StyledNumberInput
                                type="number"
                                value={timerDuration}
                                onChange={(e) => setTimerDuration(Number(e.target.value))}
                                min="1"
                                />

                        
                            <Button onClick={restartTimer}>Start Timer</Button>
                        </>
                    )}
        </div>
    );
};

export default Exercise;

  
