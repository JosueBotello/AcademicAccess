import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Profile } from '../types';

interface AdminProfileFormProps {
  onSubmit: (profile: Profile) => void;
  initialData?: Profile;
}

const AdminProfileForm: React.FC<AdminProfileFormProps> = ({ onSubmit, initialData }) => {
  const [profile, setProfile] = useState<Profile>(initialData || {
    name: '',
    title: '',
    department: '',
    phone: '',
    email: '',
    about: '',
    courses: [],
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    console.log(`Field ${name} updated:`, value); // Debug log
  };

  const handleCoursesChange = (event: SelectChangeEvent<string[]>) => {
    setProfile(prev => ({ ...prev, courses: event.target.value as string[] }));
    console.log('Courses updated:', event.target.value); // Debug log
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', profile); // Debug log
    onSubmit(profile);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {initialData ? 'Edit Profile' : 'Create New Profile'}
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={profile.name}
        onChange={handleTextChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Title"
        name="title"
        value={profile.title}
        onChange={handleTextChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Department"
        name="department"
        value={profile.department}
        onChange={handleTextChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={profile.phone}
        onChange={handleTextChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={profile.email}
        onChange={handleTextChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="About"
        name="about"
        value={profile.about}
        onChange={handleTextChange}
        margin="normal"
        multiline
        rows={4}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="courses-label">Courses</InputLabel>
        <Select
          labelId="courses-label"
          multiple
          name="courses"
          value={profile.courses}
          onChange={handleCoursesChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          <MenuItem value="Computer Science">Computer Science</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Law LLB">Law LLB</MenuItem>
          <MenuItem value="Law LLM">Law LLM</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {initialData ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Box>
  );
};

export default AdminProfileForm;