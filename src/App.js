import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

import Exercise from './components/exercise';
import WorkoutTracker from './components/WorkoutTracker';


function App() {
  const [workouts, setWorkouts] = useState(() => {
    //Load from localStorage and parse or fallback to an empty object
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : {};
  });

  // This effect updates localStorage when workouts state changes
  useEffect(() => {
    console.log("Updated workouts:", workouts);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts])

  const [exerciseOptions, setExerciseOptions] = useState(() => {
    const savedOptions = localStorage.getItem('exerciseOptions');
    console.log("Loaded exercise options:", savedOptions ? JSON.parse(savedOptions) : ['Pushup', 'Biceps', 'Squat']);
    return savedOptions ? JSON.parse(savedOptions) : ['Pushup', 'Biceps', 'Squat'];
  })

  useEffect(() => {
    console.log("Saving exercise options:", exerciseOptions);
    localStorage.setItem('exerciseOptions', JSON.stringify(exerciseOptions));
  }, [exerciseOptions]);

  return (
    <div className="App">
      <header className="App-header">
          <div className='app-wrapper'>
            <Exercise workouts={workouts} setWorkouts={setWorkouts} exerciseOptions={exerciseOptions} setExerciseOptions={setExerciseOptions}/>
            <WorkoutTracker workouts={workouts} />
          </div>
      </header>
    </div>
  );
}

export default App;
