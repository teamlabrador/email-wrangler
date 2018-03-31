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
    const userId = req.params.userId;
    res.locals.results = [];
    const projectSelector = `Select
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Threads"."groupId" as "group",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt" as "messageCreatedAt",
    "Users2"."firstName" as "author"
    from "Users" 
    inner join "Threads" on "Threads"."createdById" = "Users"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    where "Users"."id" = '${userId}'; `
    db.query(projectSelector, (err, result) => {
      let threadId;
      let projects = [];
      for (let i = 0; i < result.rows; i++) {
        let newThreadId = result.rows[i].threadId
        if (threadId !== newThreadId) {
          threadId = newThreadId;
          let newThread = {};
          newThread.threadId = threadId;
          newThread.subject = result.rows[i].subject;
          newThread.createdAt = result.rows[i].createdAt;
          newThread.groupId = result.rows[i].groupId;
          newThread.messages = [];
          let newMessage = {};
          newMessage.messageId = result.rows[i].messageId;
          newMessage.author = result.rows[i].author;
          mewMessage.message = result.rows[i].message;
          newMessage.messageCreatedAt = result.rows[i].messageCreatedAt;
          newThread.messages.push(newMessage);
        }
      }
      res.locals.results.push(result.rows);
    });

    const contributorSelector = `Select
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Users3"."firstName" as "threadAuthor",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt", "Messages"."groupId" as "messageGroupId", "Messages"."createdAt" as "messageCreatedAt",
    "Users2"."firstName" as "author"
    
    from "Groups" 
    inner join "Recipients" on "Recipients"."groupId" = "Groups"."id"
    inner join "Users" on "Recipients"."recipientId" = "Users"."id"
    inner join "Threads" on "Recipients"."threadId" = "Threads"."id"
    inner join "Users" as "Users3" on "Threads"."createdById" = "Users3"."id"
    inner join "Groups" as "Groups2" on "Threads"."groupId" = "Groups2"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    
    where "Groups"."id" = ${1} and "Users"."id" = '${userId}' and "Groups2"."id" >= ${1};`
    db.query(contributorSelector, (err, result) => {
      res.locals.results.push(result.rows);
    });

    const approvalSelector = `Select
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Users3"."firstName" as "threadAuthor",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt", "Messages"."groupId" as "messageGroupId", "Messages"."createdAt" as "messageCreatedAt",
    "Users2"."firstName" as "author"
    
    from "Groups" 
    inner join "Recipients" on "Recipients"."groupId" = "Groups"."id"
    inner join "Users" on "Recipients"."recipientId" = "Users"."id"
    inner join "Threads" on "Recipients"."threadId" = "Threads"."id"
    inner join "Users" as "Users3" on "Threads"."createdById" = "Users3"."id"
    inner join "Groups" as "Groups2" on "Threads"."groupId" = "Groups2"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    
    where "Groups"."id" = ${2} and "Users"."id" = '${userId}' and "Groups2"."id" >= ${2};`
    db.query(approvalSelector, (err, result) => {
      res.locals.results.push(result.rows);
    });

    const informedSelector = `Select
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Users3"."firstName" as "threadAuthor",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt", "Messages"."groupId" as "messageGroupId", "Messages"."createdAt" as "messageCreatedAt",
    "Users2"."firstName" as "author"
    
    from "Groups" 
    inner join "Recipients" on "Recipients"."groupId" = "Groups"."id"
    inner join "Users" on "Recipients"."recipientId" = "Users"."id"
    inner join "Threads" on "Recipients"."threadId" = "Threads"."id"
    inner join "Users" as "Users3" on "Threads"."createdById" = "Users3"."id"
    inner join "Groups" as "Groups2" on "Threads"."groupId" = "Groups2"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    
    where "Groups"."id" = ${3} and "Users"."id" = '${userId}' and "Groups2"."id" >= ${3};`
    db.query(informedSelector, (err, result) => {
      res.locals.results.push(result.rows);
      res.json(res.locals.results);
    });
  },

};

module.exports = MessageController;