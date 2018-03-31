const db = require('../models/postgresql.js');

const userController = {

  createUser (req, res) {
    const username = req.body.username;
const query = `Insert into "Users" ("username", "email", "firstName", "lastName") values (${username}, 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;`

  },

  getUsers (req, res) {

  },

  updateUser (req, res) {

  },

  deleteUser (req, res) {

  }

};

module.exports = userController;