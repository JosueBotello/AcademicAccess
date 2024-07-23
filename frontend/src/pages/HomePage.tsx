// src/pages/HomePage.tsx

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
  };

  return (
    <>
      {/* The Header component will be at the top of the page */}
      <Header />
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to AcademicAccess
          </Typography>
          <Typography variant="h6" paragraph>
            Your one-stop solution for university staff information.
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Container>
    </>
  );
};

export default HomePage;