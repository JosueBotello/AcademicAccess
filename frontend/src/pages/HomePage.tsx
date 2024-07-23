import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 

const HomePage: React.FC = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // trigger a search action
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to AcademicAccess
      </Typography>
      <Typography variant="body1" paragraph>
        Your one-stop solution for university staff information.
      </Typography>

      {/* Add the SearchBar component */}
      <Box mb={3}>
        <SearchBar onSearch={handleSearch} />
      </Box>

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