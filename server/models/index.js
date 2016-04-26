var Sequelize = require('sequelize');

// Connect to local postgresql database
var sequelize = new Sequelize('Xavier', 'Xavier', null, {
      dialect: 'postgres',
      port:    5432,
    });

// Verify connection successfull
sequelize
  .authenticate()
  .then(function(err) {
    console.log('DB connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

// Feed the models with the database call then export towards routes/index.js
var models = require('./listAndTodos')(sequelize, Sequelize);
module.exports = models;
