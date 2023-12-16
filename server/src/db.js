const mongoose = require('mongoose');

const { config } = require('./config');

async function initDB() {
  const { host, name, user, pass } = config.db;

  await mongoose.connect(`mongodb://${user}:${pass}@${host}/${name}`);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  return db;
}

module.exports = { initDB };
