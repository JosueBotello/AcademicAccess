const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden
    req.user = user; // If token is valid, set the user in the request object
    next(); // Proceed to the next middleware
  });
};

// Middleware to authorize based on user role
const authorizeRole = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' }); // If not, return 403 Forbidden
    }
    next(); // If authorized, proceed to the next middleware
  };
};

module.exports = { authenticateToken, authorizeRole };