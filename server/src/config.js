const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host: process.env.DB_HOST || 'localhost:27017',
    name: process.env.DB_NAME || 'smart_education',
    user: process.env.DB_USER || 'smart_education',
    pass: process.env.DB_PASS || 'secret',
  },
};

module.exports = { config };
