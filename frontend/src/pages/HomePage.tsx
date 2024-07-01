import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to AcademicAccess
      </Typography>
      <Typography variant="body1">
        Your one-stop solution for university staff information.
      </Typography>
    </Container>
  );
};

export default HomePage;