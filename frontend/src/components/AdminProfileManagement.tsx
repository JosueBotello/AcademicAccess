import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminProfileForm from '../components/AdminProfileForm';
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../services/api';
import { Profile } from '../types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminProfileManagement: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await getProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      setSnackbar({ open: true, message: 'Failed to fetch profiles', severity: 'error' });
    }
  };

  const handleCreate = async (profile: Omit<Profile, 'id'>) => {
    try {
      console.log('Creating profile:', profile); // Debug log
      await createProfile(profile);
      setIsCreating(false);
      fetchProfiles();
      setSnackbar({ open: true, message: 'Profile created successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to create profile:', error);
      setSnackbar({ open: true, message: 'Failed to create profile', severity: 'error' });
    }
  };

  const handleUpdate = async (updatedProfile: Profile) => {
    try {
      if (updatedProfile.id === undefined) {
        throw new Error('Profile ID is undefined');
      }
      await updateProfile(updatedProfile.id, updatedProfile);
      setEditingProfile(null);
      fetchProfiles();
      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await deleteProfile(id);
        fetchProfiles();
        setSnackbar({ open: true, message: 'Profile deleted successfully', severity: 'success' });
      } catch (error) {
        console.error('Failed to delete profile:', error);
        setSnackbar({ open: true, message: 'Failed to delete profile', severity: 'error' });
      }
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Management
      </Typography>
      
      {isCreating ? (
        <AdminProfileForm onSubmit={handleCreate} />
      ) : editingProfile ? (
        <AdminProfileForm onSubmit={handleUpdate} initialData={editingProfile} />
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => setIsCreating(true)}>
            Create New Profile
          </Button>
          <List>
            {profiles.map((profile) => (
              <ListItem key={profile.id}>
                <ListItemText primary={profile.name} secondary={profile.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => setEditingProfile(profile)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => profile.id && handleDelete(profile.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminProfileManagement;