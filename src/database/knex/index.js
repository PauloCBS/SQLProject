// Require the knexfile.js configuration
const config = require("../../../knexfile");

// Require the knex library
const knex = require("knex");

// Initialize the knex connection with the development configuration
// Assuming you're working in a development environment
const connection = knex(config.development);

module.exports = connection;
