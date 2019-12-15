const express = require('express');
const logger = require('morgan')('dev');
const bodyParser = require('body-parser');
const path = require('path');
const app = new express();

app.use(logger);
app.use(bodyParser.json({limit: "2000mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../", "public")));
app.get('*', (req, res) => {
  console.log('OK');
  res.sendFile(path.join(__dirname, "../", "public"))
})
const server = require('http').Server(app);

server.listen(8035, err => {
  if (err) {
    console.log('ERR: ', err.message);
    throw err;
  }

  console.log('SERVER IS RUNNING ON PORT 8035!\n')
});
