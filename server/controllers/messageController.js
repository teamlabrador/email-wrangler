const db = require('../models/postgresql.js');
const messageController = {

  createMessage (req, res) {
    
    const query = `Insert into "Users" ("username", "email", "firstName", "lastName") values (${username}, 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;`
    
  },

  getMessage (req, res) {
    // get the projects someone has made
    const {username} = req.body;


  },

  updateMessage (req, res) {

  },

  deleteMessage (req, res) {

  }

};

module.exports = messageController;
