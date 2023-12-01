import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout, user }) => {

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
  