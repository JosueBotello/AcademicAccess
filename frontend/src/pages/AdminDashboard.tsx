import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ token: null, role: null });
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Admin Dashboard. Here you can manage staff members and departments.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/staff-directory')}>
        View Staff Directory
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
        Logout
      </Button>
    </Container>
  );
};

export default AdminDashboard;