const db = require('../models/postgresql.js');
const messageController = {

  createThread (req, res) {
    const { subject, message }
    const id = req.params.id;
    const threadQuery = `Insert into "Threads" ("subject", "createdById", "groupId") values (${subject}, ${id}, ${1});`
    const firstMessageQuery = `Insert into "Messages" ("message", "threadId", "createdById", "groupId") values (${message}, ${threadId}, ${id}, ${1});`
    
    
  },

  createMessage (req, res) {
    
    const query = `Insert into "Users" ("username", "email", "firstName", "lastName") values (${username}, 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;`
    
  },

  getMessages (req, res) {
    // get the projects someone has made
    const {username} = req.body;


  },


};

module.exports = messageController;
