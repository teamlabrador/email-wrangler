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
    res.locals.threadList = {};
    const projectSelector = `Select "Users"."firstName" as "threadAuthor",
    "Threads"."id" as "threadId", "Threads"."subject", "Threads"."createdAt", "Threads"."groupId",
    "Messages"."id" as "messagesId", "Messages"."message", "Messages"."createdAt" as "messageCreatedAt", "Messages"."groupId" as "messageGroupId",
    "Users2"."firstName" as "author"
    from "Users" 
    inner join "Threads" on "Threads"."createdById" = "Users"."id"
    inner join "Messages" on "Messages"."threadId" = "Threads"."id"
    inner join "Users" as "Users2" on "Messages"."createdById" = "Users2"."id"
    where "Users"."id" = '${userId}'; `
    
    db.query(projectSelector, (err, result) => {
      let projects = [];
      if (result.rows.length > 0) {
      let sepThreads = [result.rows[0].threadId];
      // first get the unique threads
      for (let i = 1; i < result.rows.length; i++) {
        let count = 0;
        for (let j = 0; j < sepThreads.length; j++) {
          if (result.rows[i].threadId === sepThreads[j]) {
            count++;
          }
        }
        if (count === 0) {
          sepThreads.push(result.rows[i].threadId);
        }
      }

      for (let k = 0; k < sepThreads.length; k++) {
        let newThread = {};
        newThread.threadId = sepThreads[k];
        let count = 0;
        for (let l = 0; l < result.rows.length; l++) {
          if (result.rows[l].threadId === newThread.threadId) {
          newThread.subject = result.rows[l].subject;
          newThread.threadAuthor = result.rows[l].threadAuthor;
          newThread.createdAt = result.rows[l].createdAt;
          newThread.group = result.rows[l].groupId;
          if (count === 0) {
            newThread.messages = [];
          }
          let newMessage = {};
          let messagesId = result.rows[l].messagesId;
          let author = result.rows[l].author;
          let message = result.rows[l].message;
          let messageCreatedAt = result.rows[l].messageCreatedAt;
          let group = result.rows[l].messageGroupId;
          newMessage = { messagesId, author, message, messageCreatedAt, group };
          newThread.messages.push(newMessage);
          count++;
          }
        }
        projects.push(newThread);
      }
    }

      res.locals.threadList.projects = projects;
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
      let collaborators = [];
      if (result.rows.length > 0) {
      let sepThreads = [result.rows[0].threadId];
      // first get the unique threads
      for (let i = 1; i < result.rows.length; i++) {
        let count = 0;
        for (let j = 0; j < sepThreads.length; j++) {
          if (result.rows[i].threadId === sepThreads[j]) {
            count++;
          }
        }
        if (count === 0) {
          sepThreads.push(result.rows[i].threadId);
        }
      }
      
      for (let k = 0; k < sepThreads.length; k++) {
        let newThread = {};
        newThread.threadId = sepThreads[k];
        let count = 0;
        for (let l = 0; l < result.rows.length; l++) {
          if (result.rows[l].threadId === newThread.threadId) {
          newThread.subject = result.rows[l].subject;
          newThread.threadAuthor = result.rows[l].threadAuthor;
          newThread.createdAt = result.rows[l].createdAt;
          newThread.group = result.rows[l].groupId;
          if (count === 0) {
            newThread.messages = [];
          }
          let newMessage = {};
          let messagesId = result.rows[l].messagesId;
          let author = result.rows[l].author;
          let message = result.rows[l].message;
          let messageCreatedAt = result.rows[l].messageCreatedAt;
          let group = result.rows[l].messageGroupId;
          newMessage = { messagesId, author, message, messageCreatedAt, group };
          newThread.messages.push(newMessage);
          count++;
          }
        }
        collaborators.push(newThread);
      }
    }
      res.locals.threadList.collaborators = collaborators;

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
      let approvers = [];
      if (result.rows.length > 0) {
      let sepThreads = [result.rows[0].threadId];
      // first get the unique threads
      for (let i = 1; i < result.rows.length; i++) {
        let count = 0;
        for (let j = 0; j < sepThreads.length; j++) {
          if (result.rows[i].threadId === sepThreads[j]) {
            count++;
          }
        }
        if (count === 0) {
          sepThreads.push(result.rows[i].threadId);
        }
      }
      
      for (let k = 0; k < sepThreads.length; k++) {
        let newThread = {};
        newThread.threadId = sepThreads[k];
        let count = 0;
        for (let l = 0; l < result.rows.length; l++) {
          if (result.rows[l].threadId === newThread.threadId) {
          newThread.subject = result.rows[l].subject;
          newThread.threadAuthor = result.rows[l].threadAuthor;
          newThread.createdAt = result.rows[l].createdAt;
          newThread.group = result.rows[l].groupId;
          if (count === 0) {
            newThread.messages = [];
          }
          let newMessage = {};
          let messagesId = result.rows[l].messagesId;
          let author = result.rows[l].author;
          let message = result.rows[l].message;
          let messageCreatedAt = result.rows[l].messageCreatedAt;
          let group = result.rows[l].messageGroupId;
          newMessage = { messagesId, author, message, messageCreatedAt, group };
          newThread.messages.push(newMessage);
          count++;
          }
        }
        approvers.push(newThread);
      }
    }

      res.locals.threadList.approvers = approvers;

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
      let informed = [];
      if (result.rows.length > 0) {
      let sepThreads = [result.rows[0].threadId];
      // first get the unique threads
      for (let i = 1; i < result.rows.length; i++) {
        let count = 0;
        for (let j = 0; j < sepThreads.length; j++) {
          if (result.rows[i].threadId === sepThreads[j]) {
            count++;
          }
        }
        if (count === 0) {
          sepThreads.push(result.rows[i].threadId);
        }
      }

      for (let k = 0; k < sepThreads.length; k++) {
        let newThread = {};
        newThread.threadId = sepThreads[k];
        let count = 0;
        for (let l = 0; l < result.rows.length; l++) {
          if (result.rows[l].threadId === newThread.threadId) {
          newThread.subject = result.rows[l].subject;
          newThread.threadAuthor = result.rows[l].threadAuthor;
          newThread.createdAt = result.rows[l].createdAt;
          newThread.group = result.rows[l].groupId;
          if (count === 0) {
            newThread.messages = [];
          }
          let newMessage = {};
          let messagesId = result.rows[l].messagesId;
          let author = result.rows[l].author;
          let message = result.rows[l].message;
          let messageCreatedAt = result.rows[l].messageCreatedAt;
          let group = result.rows[l].messageGroupId;
          newMessage = { messagesId, author, message, messageCreatedAt, group };
          newThread.messages.push(newMessage);
          count++;
          }
        }
        informed.push(newThread);
      }
    }

      res.locals.threadList.informed = informed;

      res.json(res.locals.threadList);
    });
  },

};

module.exports = MessageController;