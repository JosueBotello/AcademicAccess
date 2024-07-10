const config = require('./config/config')[process.env.NODE_ENV || 'development'];

console.log('Direct Config Import:', config);