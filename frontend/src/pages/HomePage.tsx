import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to AcademicAccess
          </Typography>
          <Typography variant="h6" paragraph>
            Your one-stop solution for university staff information.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to access the staff directory.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage