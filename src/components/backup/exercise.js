import React, { useEffect, useState } from 'react';
import Timer from './timer';
import SetLogger from './setlogger';
import { Button, GlobalStyle } from './GlobalStyles';

// const WorkoutTracker = () => {
//     const [workouts, setWorkouts] = useState({});
//     const [today] = useState(new Date().toISOString().split('T')[0]);
    
//     useEffect(() => {
//         // Load the workout history from localStorage
//         const workoutHistory = JSON.parse(localStorage.getItem('workouts')) || {};
//         setWorkouts(workoutHistory);
//     })

//     useEffect(() => {
//         // Save the updated workouts to localStorage
//         localStorage.setItem('workouts', JSON.stringify(workouts));
//     }, [workouts]);

//     const logSetForToday = (setNumber, reps) => {
//         // Add the new set to today's workouts
//         const todayWorkouts = workouts[today] || [];
//         const updateTodayWorkouts = [ ...todayWorkouts, { setNumber, reps }];
//         setWorkouts({ ...workouts, [today]: updateTodayWorkouts });
//     };

//     // Render previous workouts and today's input form
//     return (
//         <div>
//             {/* Display the past workouts */}
//             <PreviousWorkouts workouts={workouts} />
            
//             {/* Fresh input for today's workout */}
//             <SetLogger setNumber={1} onLogSet={logSetForToday} />
//             {/* ... other sets for today ... */}
//         </div>
//     )
// }


const Exercise = () => {
    const [sets, setSets] = useState([{ setNumber: 1, reps: 0}]);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const initialTime = 60; // Set this to whatever your initial time should be

    // Log the set and restart the timer  
    const onLogSet = (setNumber, newReps) => {
        setSets((prevSets) => {
        // Update the reps for the set that was just completed
        const updatedSets = prevSets.map(set => 
            set.setNumber === setNumber ? { ...set, reps: newReps } : set
        );

        // Add a new set for the next set of reps
          return [...updatedSets, { setNumber: setNumber + 1, reps: 0 }];
        });
    
        // // Reset the reps for the next new set input
        // setSets([...sets, { setNumber: setNumber + 1, reps: 0 }]);
    
        // Start the timer after logging the set
        setIsTimerActive(false); // Deactivate and reactivate to reset
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
                    initialTime={initialTime}
                    onTimerEnd={onTimerEnd}
                />
            ) : (
                // This button could be made invisible or removed entirely, depending on your design
                <Button onClick={restartTimer}>Start Timer</Button>
            )}
        </div>
    );
};

export default Exercise;

    // Replace the current inputs with a dynamic render based on the current set


// function ExerciseList() {
//     // State to hold the list of exercises
//     const [exercises, setExercises] = useState([]);

//     // State to hold the value of the new exercise name input field
//     const [newExerciseName, setNewExerciseName] = useState("");

//     // Function to add a new exercise to the exercises array
//     const handleAddExercise = (exerciseName) => {
//         // Add a new exercise to the list
//         setExercises([...exercises, { name: exerciseName, sets: [] }]);
//         setNewExerciseName(""); // Clear the input field after adding
//     };

//     // Delete an exercise from the from the exercise array
//     const handleDeleteExercise = (exerciseIndex) => {
//         const updatedExercises = exercises.filter((_, index) => index !== exerciseIndex);
//         setExercises(updatedExercises);
//     };

//     // Log a set. execerciseIndex represents the position of an exercise in the array
//     // reps is the number performed in the set
//     const handleLogSet = (exerciseIndex, reps) => {
//         // first a shallow copy of the existing exercises array using the spread operator
//         const newExercises = [...exercises];
//         // get specific exercise and push reps to it as new object
//         newExercises[exerciseIndex].sets.push({ reps });
//         // update the state with modified exercises array. rerenders component
//         setExercises(newExercises)
//         setShowTimer(true) // start timer
//     }

//     // Display timer?
//     const [showTimer, setShowTimer] = useState(false);

//     const handleTimerEnd = () => {
//         setShowTimer(false); // Hide the timer
//     }

//     return (
        
        
//         <div>
            
//             <h2>Exercise List</h2>
//             {/* List of exercises */}
//             <ul>
//                 {exercises.map((exercise, index) => (
//                 <li key={index}>
//                     {exercise.name}
//                     <button onClick={() => handleDeleteExercise(index)}>Delete</button>
//                     {showTimer && <Timer initialTime={60} onTimerEnd={handleTimerEnd}/ >}
//                     <SetLogger onLogSet={(reps) => handleLogSet(index, reps)} />
//                     <ul>
//                         {exercise.sets.map((set, setIndex) => (
//                             <li key={setIndex}>Reps: {set.reps}</li>
//                         ))}
//                     </ul>
//                 </li>
//                 ))}
//             </ul>
            
//             {/* Input field for adding a new exercise */}
//             <form
//                 type="text"
//                 placeholder="New Exercise Name"
//                 value={newExerciseName}
//                 onChange={e => setNewExerciseName(e.target.value)}
//                 />

//             {/* Button to trigger handleAddExercise */}
//             <Button onClick={() => handleAddExercise(newExerciseName)}>Add Exercise</Button>
//             {/* Edit Exercise Form (if needed) */}
//         </div>
//     );
// }

// export default ExerciseList;
