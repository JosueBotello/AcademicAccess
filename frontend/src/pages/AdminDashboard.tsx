import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  // Handler for user logout
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
        Welcome to the Admin Dashboard. Here you can manage staff members, departments, and profiles.
      </Typography>
      <Grid container spacing={2}>
        {/* Button to view staff directory */}
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/staff-directory')}>
            View Staff Directory
          </Button>
        </Grid>
        {/* Button to manage profiles */}
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/admin/profiles')}>
            Manage Profiles
          </Button>
        </Grid>
        {/* Logout button */}
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;