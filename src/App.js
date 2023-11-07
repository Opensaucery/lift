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
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts])

  return (
    <div className="App">
      <header className="App-header">
       <Exercise workouts={workouts} setWorkouts={setWorkouts} />
       <WorkoutTracker workouts={workouts} />
      </header>
    </div>
  );
}

export default App;
