const express = require('express');
const app = express();
const messageController = require('./controllers/messageController.js');
const userController = require('./controllers/messageController.js');

app.listen(8080, () => {
  console.log('listening on port 8080...')
})
