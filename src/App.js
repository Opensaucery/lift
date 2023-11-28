import './App.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/UserContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore, auth } from './Firebase';
import { signOut } from 'firebase/auth';
import Header from './components/Header';
import Exercise from './components/exercise';
import WorkoutTracker from './components/WorkoutTracker';

// only load when clicked
// const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/auth/Login'));
const SigninPage = lazy(() => import('./components/auth/SignUp'));


function App() {
  const { user, setUser } = useAuth();
  const [workouts, setWorkouts] = useState({});
  const [exerciseOptions, setExerciseOptions] = useState(() => {
    const savedOptions = localStorage.getItem('exerciseOptions');
    return savedOptions ? JSON.parse(savedOptions) : ['Pushup', 'Biceps', 'Squat'];
  })

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setUser(null); // Clear the user
        setWorkouts({}); // Reset workouts after logout
        localStorage.removeItem('workouts'); // Optionally clear local storage
      } catch (error) {
      console.error("Logout error: ", error);
    };
  }
  
  
  return (
    <AuthProvider>
      <AppBody
        workouts={workouts}
        setWorkouts={setWorkouts}
        exerciseOptions={exerciseOptions}
        setExerciseOptions={setExerciseOptions}
        handleLogout={handleLogout}
        />
    </AuthProvider>
  );
}
    
function AppBody({ workouts, setWorkouts, exerciseOptions, setExerciseOptions, handleLogout }) {
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchWorkouts () {
      console.log(user)
      if (user && isMounted) {
        setWorkouts({});
            // get from db
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            console.log('DocSnap exists?', docSnap);
            
            // Checks if the document exists and if it does, sets the workouts to the data stored in the document. 
            // This assumes that the entire workout data is stored under this document.
            if (docSnap.exists()) {
              setWorkouts(docSnap.data().workouts); // Assuming the entire workout data is stored under this document
              console.log('docSnap.data()', docSnap.data());
              console.log('Workout data updated?', workouts);
            }
          } else if (!user) {
                  //Load from localStorage and parse or fallback to an empty object
                  const savedWorkouts = localStorage.getItem('workouts');
                  setWorkouts(savedWorkouts ? JSON.parse(savedWorkouts) : {});
            }
        }
        
        fetchWorkouts();
        return () => { isMounted = false };
      }, [user]);   

  // This updates localStorage or db when workouts state changes
  useEffect(() => {
    const savedWorkouts = async () => {

      if (user && workouts && Object.keys(workouts).length > 0) {
        try {
          const userWorkoutsRef = doc(firestore, 'users', user.uid);
          await setDoc(userWorkoutsRef, { workouts })
        } catch (error) {
          console.error("Error writing to Firestore: ", error);
        }
      } else if (!user) {
          localStorage.setItem('workouts', JSON.stringify(workouts));
      }
    } 
    
    savedWorkouts();
    
  }, [workouts, user]);

  useEffect(() => {
    localStorage.setItem('exerciseOptions', JSON.stringify(exerciseOptions));
  }, [exerciseOptions]);

  return (
    <div className="App">
      <header className="App-header">
          <div className='app-wrapper'>
              <Router>
                <Header handleLogout={handleLogout} />
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
