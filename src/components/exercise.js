import React, { useState } from 'react';
import { Button, GlobalStyle } from './GlobalStyles';
import Timer from './timer';
import SetLogger from './setlogger';


const Exercise = ({ workouts, setWorkouts }) => {
    const [sets, setSets] = useState([{ setNumber: 1, reps: 0}]);
    const [isTimerActive, setIsTimerActive] = useState(false);
       
    const initialTime = 60; // Set this to whatever your initial time should be
    const [timerDuration, setTimerDuration] = useState(initialTime);
    
    const onLogSet = (setNumber, newReps) => {
        // First, find if today's date already has a workout logged
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = workouts[today] || [];
      
        // Check if the current exercise already has an entry for today
        let exerciseLogged = todayWorkouts.find(ex => ex.exercise === 'Squat'); // replace 'Squat' with variable if needed
      
        if (exerciseLogged) {
          // If the exercise is already logged today, append the new set to it
          exerciseLogged.sets.push({ setNumber, reps: newReps });
        } else {
          // If the exercise is not logged today, create a new entry
          exerciseLogged = {
            exercise: 'Squat', // again, replace 'Squat' with variable if needed
            sets: [{ setNumber, reps: newReps }],
          };
          todayWorkouts.push(exerciseLogged);
        }
      
        // Update the state with the new or updated workout entry
        setWorkouts(prevWorkouts => ({
          ...prevWorkouts,
          [today]: todayWorkouts,
        }));
      
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
            <h2>Log your excercise</h2>
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
                    <input
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

  
