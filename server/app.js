var express = require('express');
var db = require('./db/index.js');
var mysql = require('mysql');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

app.use(express.static(__dirname + "/../client"));

app.get('/', function(req,res) {
  res.render('../client/index.html');
  console.log(req.method);
  db.connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, fields);
    });
})

app.post('/', function(req,res) {
  // db.connection;
  // db.connection.connect;
  db.connection.query('INSERT into users (userid, username) VALUES (1, \'hou\')', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, fields);
    });
  // res.end('submitted');
  // connection.end();
})

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

