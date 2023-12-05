import './App.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/UserContext';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './Firebase';
import { signOut } from 'firebase/auth';
import Header from './components/Header';
import Exercise from './components/exercise';
import WorkoutTracker from './components/WorkoutTracker';
import { auth } from './Firebase'


// only load when clicked
// const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/auth/Login'));
const SigninPage = lazy(() => import('./components/auth/SignUp'));


function App() {
  const [workouts, setWorkouts] = useState(() => {
    const localData = localStorage.getItem('workouts');
    return localData ? JSON.parse(localData) : {};
  });
  const [exerciseOptions, setExerciseOptions] = useState(() => {
    const savedOptions = localStorage.getItem('exerciseOptions');
    console.log("this is ", savedOptions);
    return savedOptions ? JSON.parse(savedOptions) : ['Pushup', 'Biceps', 'Squat'];
  })
  
  
  return (
    <AuthProvider>
      <AppBody
        workouts={workouts}
        setWorkouts={setWorkouts}
        exerciseOptions={exerciseOptions}
        setExerciseOptions={setExerciseOptions}
        />
    </AuthProvider>
  );
}
    
function AppBody({ workouts, setWorkouts, exerciseOptions, setExerciseOptions }) {
  const { user, setUser } = useAuth();
  

  const handleLogout = async () => {
    try {
      console.log("trying to logout")
      await signOut(auth);
      setUser(null); // Clear the user
      localStorage.removeItem('workouts'); // Clear local storage
      localStorage.removeItem('exerciseOptions'); // Clear local storage
      setWorkouts({});
      setExerciseOptions(['Pushup', 'Biceps', 'Squat']);
  
    } catch (error) {
    console.error("Logout error: ", error);
  };
  }

  // everytime user changes
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (user) {
            // get from db if no local data
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
          
            if (docSnap.exists()) {
              setWorkouts(docSnap.data().workouts || {});
              setExerciseOptions(docSnap.data().exerciseOptions || ['Pushup', 'Biceps', 'Squat']);
            } 
        } 
    }; 
        fetchWorkouts();
    }, [user]);   

  // Save workouts to Firestore when workouts change and logged in
  useEffect(() => {
    const saveWorkoutsToFirestore = async () => {
      if (user && workouts && Object.keys(workouts).length > 0) {
        const userWorkoutsRef = doc(firestore, 'users', user.uid);
        await updateDoc(userWorkoutsRef, { workouts });
      }
    };

    const saveExerciseOptionsToFirestore = async () => {
      if (user && exerciseOptions && exerciseOptions.length > 0) {
        const userExerciseOptionsRef = doc(firestore, 'users', user.uid);
        await updateDoc(userExerciseOptionsRef, { exerciseOptions });
      }
    }

    if (user) {
      saveWorkoutsToFirestore();
      saveExerciseOptionsToFirestore();
    }
  }, [workouts, exerciseOptions]);

  // Handling local storage for non-logged-in users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('workouts', JSON.stringify(workouts));
      localStorage.setItem('exerciseOptions', JSON.stringify(exerciseOptions));
    }
  }, [workouts]);

  return (
    <div className="App">
      <header className="App-header">
          <div className='app-wrapper'>
              <Router>
                <Header 
                  handleLogout={handleLogout}
                  user={user}
                />
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
          </div>
      </header>
    </div>
  );
}

export default App;
