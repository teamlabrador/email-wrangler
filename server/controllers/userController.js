const db = require('../models/postgresql.js');
// const createUser = `Insert into "Users" ("username", "email", "firstName", "lastName") values ('mmb296', 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;` Sample Post Request Insert

const MessageController = {

  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student

  createUser (req, res) {
    // const example = `SELECT "message" from "Messages" where "threadId" = (SELECT "id" FROM "Threads" WHERE "createdById" = 1)`


    const createUserQuery = `INSERT INTO "Users" ("id", "username", "email", "password", "firstName", "lastName")
    VALUES (${ id }, ${ req.body.id }, ${ req.body.email }, ${ req.body.password }, ${ req.body.firstName }, ${ req.body.lastName }')`;

    db.query(createUserQuery, (err, result) => {

      if (err) console.log(err);
      else if (result) console.log("create user result:", result);

    });



  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deleteUser (req, res) {
    let id = 6;
    const deleteUserQuery = `DELETE FROM "Users" WHERE "id" = ${ id }`;
    db.query(deleteUserQuery, (err, result) => {
      if (err) console.log(err);
      else if (result) console.log("create user result:", result);

    });
  }

};
