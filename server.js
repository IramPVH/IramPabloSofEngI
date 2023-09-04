const express = require('express');
const app = express();
const port = 8000;

// Path to get user's data
app.get('/login-user', (req, res) => {
  const data = require('./dummy-data.json');
  res.send(data);
});

// Root path
app.get('/', (req, res) => {
  res.send('This is the root of my server');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
