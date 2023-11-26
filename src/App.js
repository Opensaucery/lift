import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/UserContext';
import Header from './components/Header';
import Exercise from './components/exercise';
import WorkoutTracker from './components/WorkoutTracker';

// only load when clicked
// const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/auth/Login'));
const SigninPage = lazy(() => import('./components/auth/SignUp'));


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
            <AuthProvider>
              <Router>
                <Header />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* Render Exercise and WorkoutTracker on the root path */}
                    <Route
                      path="/"
                      element={
                        <>
                          <Exercise 
                            workouts={workouts} 
                            setWorkouts={setWorkouts} 
                            exerciseOptions={exerciseOptions} 
                            setExerciseOptions={setExerciseOptions}
                          />
                          <WorkoutTracker workouts={workouts} />
                        </>
                      }
                    />
                    {/* <Route exact path='/' component={HomePage} /> */}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SigninPage />} />
                  </Routes>
                </Suspense>
              </Router>
            </AuthProvider>
          </div>
      </header>
    </div>
  );
}

export default App;
