import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to AcademicAccess
      </Typography>
      <Typography variant="body1" paragraph>
        Your one-stop solution for university staff information.
      </Typography>
      <Button component={Link} to="/login" variant="contained" color="primary">
        Login
      </Button>
      <Button component={Link} to="/register" variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
        Register
      </Button>
    </Container>
  );
};

export default HomePage;