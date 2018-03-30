const express = require('express');
const app = express();


const pgController = require('./controllers/messageController.js');

app.listen(8080, () => {
  console.log('listening on port 8080...')
})
