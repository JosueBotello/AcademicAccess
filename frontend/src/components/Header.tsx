import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {/* This Box component pushes the buttons to the right */}
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button component={Link} to="/register" variant="outlined" color="primary">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;