const { models } = require('../database');
const { Profile } = models;

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(400).json({ error: 'Failed to create profile' });
  }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};

// Get a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const [updated] = await Profile.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProfile = await Profile.findByPk(req.params.id);
      res.json(updatedProfile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: 'Failed to update profile' });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};