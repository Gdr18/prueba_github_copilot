// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Read comments from file
function readComments() {
  const commentsPath = path.join(__dirname, 'comments.json');
  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
  return comments;
}

// Write comments to file
function writeComments(comments) {
  const commentsPath = path.join(__dirname, 'comments.json');
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
}

// Get comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Add comment
app.post('/comments', bodyParser.json(), (req, res) => {
  const comments = readComments();
  comments.push(req.body);
  writeComments(comments);
  res.json(comments);
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});