import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home Page
      </Button>
    </Container>
  );
};

export default NotFound;