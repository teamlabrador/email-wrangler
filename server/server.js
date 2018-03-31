const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const threadController = require('./controllers/messageController.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const threadRouter = express.Router();
app.use('/thread', threadRouter);

app.get('/:userId', threadController.getMessages);
// (req, res) => {
//   res.json({ data: 'Tons of stuff'});
// }

threadRouter.post('/', threadController.createThread);
// (req, res) => {
//   res.json({ success: req.body.Stuff});
// }

threadRouter.post('/:threadId', threadController.createMessage);
// (req, res) => {
//   const id = req.params.id;
//     res.json({ success: id});
// }

app.listen(PORT, () => {
  console.log('listening on port 8080...')
})
