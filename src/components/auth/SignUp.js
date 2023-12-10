import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../Firebase';
import { AuthContext } from './UserContext';
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { Button } from '../GlobalStyles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the user in the context
      navigate('/'); // Navigate to the dashboard or home page after sign up
    
      // Check for existing local storage data
      const workoutsData = localStorage.getItem('workouts');
      const exerciseOptionsData = localStorage.getItem('exerciseOptions');
      if (workoutsData || exerciseOptionsData) {
        const userData = {
          workouts: workoutsData ? JSON.parse(workoutsData) : null,
          exerciseOptions: exerciseOptionsData ? JSON.parse(exerciseOptionsData) : null,
        };
        
        console.log("Attempting to write to Firestore: ", userData); // Make sure this line logs
        
        if(userData) {
          console.log("User data from localStorage: ", userData);
          // Migrate local data to user's account in Firestore
          try {
            await setDoc(doc(firestore, 'users', userCredential.user.uid), userData);
            console.log("Data written to Firestore"); // Check if this gets logged
          } catch (error) {
            console.error("Error writing to Firestore: ", error);
          } 
        // Clear local storage
        // localStorage.removeItem('workouts'); // eventually uncomment these?
        // localStorage.removeItem('exerciseOptions');
        } else {
          console.log("No user data found in localStorage")
        }
      }

    } catch (error) {
      console.error("Sign Up error", error);

            // Custom error message for the user
      let errorMessage = '';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This account is already in use.';
      } else if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect email or password.';
      } else {
        errorMessage = 'An error occurred during login. Please try again.';
      }

      setSignInError(errorMessage); // Set the custom error message
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className='user-form' onSubmit={handleSignUp}>
      <label htmlFor="new-email">Email</label>
        <input 
          id="new-email"
          type="email" 
          name='new-email'
          autoComplete='new-email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <label htmlFor="new-password">Password</label>
        <input 
          id="new-password"
          type="password"
          name='new-password'
          autoComplete='new-password'  
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <p>By signing up you agree to your data being stored on our secure servers</p>
        <Button type="submit">Sign Up</Button>
        {signInError && <p style={{ color: 'grey' }}>{signInError}</p>} {/* Display the error message */}
      </form>
    </div>
  );
};



export default SignUp;
