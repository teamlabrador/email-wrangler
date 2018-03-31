const db = require('../models/postgresql.js');
// const createUser = `Insert into "Users" ("username", "email", "firstName", "lastName") values ('mmb296', 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;` Sample Post Request Insert

const userController = {

  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student

  loginUser(req, res) {
    const { username, password } = req.body;
    const loginQuery = `Select "firstName", "lastName", "id", "email", "userImage" from "Users" where "username" = '${username}' and "password" = '${password}';`
    db.query(loginQuery, (err, result) => {
      if (err || result.rows.length === 0) {
        res.status(400).json({error: 'invalid username or password'});
      } else if (result) {
      res.json({ firstName: result.rows[0].firstName, lastName: result.rows[0].lastName, userId: result.rows[0].id, email: result.rows[0].email, userImage: result.rows[0].userImage });
      }
    });
  },

  createUser (req, res) {
    // const example = `SELECT "message" from "Messages" where "threadId" = (SELECT "id" FROM "Threads" WHERE "createdById" = 1)`


    const createUserQuery = `INSERT INTO "Users" ("username", "email", "password", "firstName", "lastName", "userImage")
    VALUES ( '${ req.body.username }', '${ req.body.email }', '${ req.body.password }', '${ req.body.firstName }', '${ req.body.lastName }', '${ req.body.userImage }');`;

    db.query(createUserQuery, (err, result) => {
      if (err) {
        res.status(400).json({error: 'error creating user'})
      }
      else if (result) {
        res.json(result);
      }
    });



  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  // deleteUser (req, res) {
  //   let id = 6;
  //   const deleteUserQuery = `DELETE FROM "Users" WHERE "id" = ${ id }`;
  //   db.query(deleteUserQuery, (err, result) => {
  //     if (err) console.log(err);
  //     else if (result) console.log("create user result:", result);

  //   });
  // }

};

module.exports = userController;