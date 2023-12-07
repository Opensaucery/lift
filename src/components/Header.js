import React from 'react';
import { Button, StyledLink } from './GlobalStyles';

const Header = ({ handleLogout, user }) => {

    return (
      <nav>
        {/* Other navigation items... */}
        {!user && (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup" style={{ marginLeft: '10px' }}>Sign Up</StyledLink>
          </>
        )}
        {user && <Button onClick={handleLogout}>Logout</Button>}
      </nav>
    );
  };

export default Header;
  