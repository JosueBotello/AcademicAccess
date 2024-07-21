import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const Login: React.FC = () => {
  // State for form inputs and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // Custom hook to access user context
  const { setUser } = useUser();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Attempt to log in
      const response = await login(username, password);
      
      // Update user context
      setUser({ token: response.token, role: response.role });
      
      // Redirect based on role
      if (response.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (response.role === 'academic_staff') {
        navigate('/staff-dashboard');
      } else {
        navigate('/staff-directory');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;