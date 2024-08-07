const jwt = require('jsonwebtoken');

// Mock user database
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'staff', password: 'staff123', role: 'academic_staff' },
  { id: 3, username: 'student', password: 'student123', role: 'student' }
];

// Helper function to find user by username
const findUser = (username) => {
  return users.find(user => user.username === username);
};

// Login controller
exports.login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);

    // Extract username and password from request body
    const { username, password } = req.body;

    console.log('Attempting to find user:', username);
    // Find the user in our mock database
    const user = findUser(username);

    console.log('User found:', user);

    // If user doesn't exist or password is incorrect, return error
    if (!user || user.password !== password) {
      console.log('Authentication failed. User:', user, 'Password match:', user ? user.password === password : false);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Authentication successful. Creating token for user:', user.username);

    // Create a JWT token containing user id and role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    console.log('Token created. Sending response.');

    // Send token and user role in the response
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Registration controller (for future implementation)
exports.register = async (req, res) => {
  console.log('Registration request received:', req.body);
  
  // Implementation for user registration would go here
  res.status(501).json({ message: 'Registration not implemented yet' });
};