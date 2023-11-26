import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/UserContext';

const Header = () => {
    // const [user, setUser] = useState(null); // You'll probably get this from context or props
  
    const { user, handleLogout } = useAuth();

    return (
      <nav>
        {/* Other navigation items... */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" style={{ marginLeft: '10px' }}>Sign Up</Link>
          </>
        )}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    );
  };

export default Header;
  