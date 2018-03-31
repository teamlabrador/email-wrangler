const db = require('../models/postgresql.js');
// const createUser = `Insert into "Users" ("username", "email", "firstName", "lastName") values ('mmb296', 'mmb296@cornell.edu', 'Madalyn', 'Baehre') RETURNING *;` Sample Post Request Insert

const MessageController = {

  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student

  createThread (req, res) {
    const { userId, subject, message, contributorEmails, approverEmails, informedEmails } = req.body;
    let threadId;
    const threadQuery = `Insert into "Threads" ("subject", "createdById", "groupId") values ('${subject}', ${userId}, ${1}) returning "id" as "id";`

    db.query(threadQuery, (err, result) => {
      threadId = result.rows[0].id;
      firstMessage(threadId);
      addContributors(threadId);
      addApprovers(threadId);
      addInformed(threadId);
    });

    function firstMessage(threadId) {
      const firstMessageQuery = `Insert into "Messages" ("message", "threadId", "createdById", "groupId") values ('${message}', ${threadId}, ${userId}, ${1});`
      db.query(firstMessageQuery, (err, result) => {
      });
    }

    function addContributors(threadId) {
    for (let i = 0; i < contributorEmails.length; i++) {
      let contributorEmail = contributorEmails[i];
      const contributorEmailQuery = `Select "id" from "Users" where "email" = '${contributorEmail}';`
      db.query(contributorEmailQuery, (err, result) => {
        let recipientId = result.rows[0].id;
        const contributorQuery = `Insert into "Recipients" ("threadId", "recipientId", "groupId") values (${threadId}, ${recipientId}, ${1});`
        db.query(contributorQuery, (err, result) => {
        })
      })
    }
    }

    function addApprovers(threadId) {
      for (let i = 0; i < approverEmails.length; i++) {
        let approverEmail = approverEmails[i];
        const approverEmailQuery = `Select "id" from "Users" where "email" = '${approverEmail}';`
        db.query(approverEmailQuery, (err, result) => {
          let recipientId = result.rows[0].id;
          const approverQuery = `Insert into "Recipients" ("threadId", "recipientId", "groupId") values (${threadId}, ${recipientId}, ${2});`
          db.query(approverQuery, (err, result) => {
          })
        })
      }
      }

      function addInformed(threadId) {
        for (let i = 0; i < informedEmails.length; i++) {
          let informedEmail = informedEmails[i];
          const informedEmailQuery = `Select "id" from "Users" where "email" = '${informedEmail}';`
          db.query(informedEmailQuery, (err, result) => {
            let recipientId = result.rows[0].id;
            const informedQuery = `Insert into "Recipients" ("threadId", "recipientId", "groupId") values (${threadId}, ${recipientId}, ${3});`
            db.query(informedQuery, (err, result) => {
            })
          })
        }
        }
    res.json({success: userId});
  },

  createMessage (req, res) {
    const { userId, message, groupId } = req.body;
    const threadId = req.params.threadId;
    const messageQuery = `Insert into "Messages" ("message", "threadId", "createdById", "groupId") values ('${message}', ${threadId}, ${userId}, ${groupId});`
    db.query(messageQuery, (err, result) => {
      res.json({success:userId});
    });

  },

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  getMessages (req, res) {
    const projectSelector = `Select
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Threads"."groupId" as "group",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt",
    "Users2"."firstName" as "author"
    from "Users" 
    inner join "Threads" on "Threads"."createdById" = "Users"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    where "Users"."id" = 1;`
    db.query(projectSelector, (err, result) => {
      res.json(result);
    });
  },

};

module.exports = MessageController;