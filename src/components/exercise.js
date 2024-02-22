import React, { useEffect, useState } from 'react';
import { Button, GlobalStyle, StyledNumberInput } from './GlobalStyles';
import Timer from './timer';
import SetLogger from './setlogger';
import { unstable_useViewTransitionState } from 'react-router-dom';


const Exercise = ({ workouts, setWorkouts, exerciseOptions, setExerciseOptions }) => {
    const initialExerciseType = exerciseOptions.length > 0 ? exerciseOptions[0].name : '';
    console.log(initialExerciseType);
    const [exerciseType, setExerciseType] = useState(initialExerciseType);
    console.log(exerciseOptions);
    
    const [inputValue, setInputValue] = useState(''); // new state for input field

    // Function to update exercise type from input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Function to update exercise type from dropdown
    const handleDropdownChange = (e) => {
            const selectedOptionName = e.target.value
            setExerciseType(selectedOptionName);
            setInputValue(selectedOptionName); // Update the input field to match the selection
        
            // Find the weight for the selected exercise and update the state
            const selectedOption = exerciseOptions.find(option => option.name === selectedOptionName);
            if (selectedOption) {
                const weightForSelectedExercise = selectedOption.weight || 0;
                setSets(sets => sets.map(set => ({ ...set, weight: weightForSelectedExercise })));
            }
        }
    
    const [sets, setSets] = useState([{ setNumber: 1, reps: 0, weight: 0}]);
    const [isTimerActive, setIsTimerActive] = useState(false);
       
    const initialTime = 60; // Set this to whatever your initial time should be
    const [timerDuration, setTimerDuration] = useState(initialTime);
    
    const onLogSet = (setNumber, newReps, newWeight) => {
        // First, find if today's date already has a workout logged
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = workouts[today] || [];
      
        // Detemine the exercise type to log
        const typeToLog = inputValue || exerciseType;

        // Update the weight for the exercise in exerciseOptions
        let updatedOptions = exerciseOptions.map(option => {
            if (option.name === typeToLog) {
                return { ...option, weight: newWeight };
            }
            return option;
        })

        // Add new exercise if it does not exist
        if (!exerciseOptions.some(option => option.name === typeToLog)) {
            // Update the weight for the exercise in exerciseOptions
            updatedOptions = [...updatedOptions, { name: typeToLog, weight: newWeight }]
            };

        setExerciseOptions(updatedOptions);

        // Reset input field only if a new exercise was typed in
        if (inputValue && !exerciseOptions.find(option => option.name === inputValue)) {
            setInputValue('');
        }

        // Check if the current exercise already has an entry for today
        let exerciseLogged = todayWorkouts.find(ex => ex.exercise === typeToLog);

        // Create the new set object
        let newSet = { setNumber, reps: newReps };
        if (newWeight > 0) {
            newSet.weight = newWeight;
        }
      
        if (exerciseLogged) {
          // If the exercise is already logged today, append the new set to it
          exerciseLogged.sets.push(newSet);
        } else {
          // If the exercise is not logged today, create a new entry
          exerciseLogged = {
            exercise: typeToLog, 
            sets: [newSet],
          };
          todayWorkouts.push(exerciseLogged);

          //Reset sets state to start from set number 1 for new exercise type
          setSets([{ setNumber: 1, reps: 0 }]);
        }
      
        // Update the state with the new or updated workout entry
        setWorkouts(prevWorkouts => {
            const updatedWorkouts = {...prevWorkouts, [today]: todayWorkouts};
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

    const handleFocus = (event) => event.target.select();

    const currentSetNumber = sets.length;
    
    
    return (
        <div>
            <GlobalStyle />
                    <h1>Log your exercise</h1>
                    
                            {/* ComboBox for selecting or typing in exercise type */}
                            <select
                                value={exerciseType}
                                onChange={handleDropdownChange}
                            >
                                {exerciseOptions.map((option, index) => (
                                    <option key={index} value={option.name}>{option.name}</option>
                                    ))}
                            </select>
                            <input 
                                type='text'
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder='Or add a new exercise'
                            />

                    {
                        sets.length > 0 && (
                            <SetLogger
                                key={currentSetNumber}
                                setNumber={currentSetNumber}
                                initialReps={sets[sets.length - 1].reps}
                                initialWeight={exerciseOptions.find(option => option.name === exerciseType)?.weight || 0}
                                onLogSet={(reps, weight) => onLogSet(currentSetNumber, reps, weight)} // Pass reps to onLogSet correctly
                                onTimerReset={restartTimer}
                            />
                        )
                    }
                    {isTimerActive ? (
                        <Timer 
                        initialTime={timerDuration}
                        onTimerEnd={onTimerEnd}
                        />
                    ) : (
                        <div className='timer'>
                            <StyledNumberInput
                                type="number"
                                value={timerDuration}
                                onFocus={handleFocus}
                                onChange={(e) => setTimerDuration(Number(e.target.value))}
                                min="1"
                                />

                        
                            <Button onClick={restartTimer}>Start Timer</Button>
                        </div>
                    )}
        </div>
    );
};

export default Exercise;
