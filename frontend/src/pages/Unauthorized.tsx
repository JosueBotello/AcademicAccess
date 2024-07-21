import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
        Back to Login
      </Button>
    </Container>
  );
};

export default Unauthorized;