import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import from react-router-dom v6
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { AuthContext } from './UserContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');


  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the user in the context
      // Redirect to home page or dashboard
      navigate('/'); // Adjust the route as necessary
      setLoginError(''); // Clear any previous errors
    } catch (error) {
      console.error("Login error", error);
      
    // Custom error message for the user
    let errorMessage = '';
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This user account has been disabled.';
    } else if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect email or password.';
    } else {
      errorMessage = 'An error occurred during login. Please try again.';
    }

    setLoginError(errorMessage); // Set the custom error message
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input 
        id="email"
        type="email" 
        name='email'
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        // placeholder="Email" 
      />
      <label htmlFor="password">Password</label>
      <input 
        id="password"
        type="password"
        name='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        // placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
      {loginError && <p style={{ color: 'grey' }}>{loginError}</p>} {/* Display the error message */}
    </div>
  );
};

export default Login;
