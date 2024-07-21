import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist.
      </Typography>
    </Container>
  );
};

export default NotFound;