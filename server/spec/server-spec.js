/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

       var tablename = "users"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "localhost:3000",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "localhost:3000",
              json: {
                username: "Valjean",
                userid: 10,
                // roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "INSERT into users (username, userid) VALUES ('Valjean', 10)";
        var queryArgs = ["Valjean", 10];

        dbConnection.query(queryString, function(err, results) {
          // Should have one result:
          // console.log('hello world');
          // console.log(results);
          expect(results.affectedRows).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          // expect(results[0].message).to.equal("In mercy's name, three days is all I need.");

          done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       var queryString = "INSERT into users (username, userid) VALUES ('Valjean', 10)";
       // var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, function(err, results) {
      if (err) { throw err; }
      console.log('hello')
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("localhost:3000", function(error, response, body) {
      console.log(results);

        // var messageLog = JSON.parse(body);
        console.log(messageLog);
        // expect(messageLog[0].text).to.equal("Men like you can never change!");
        // expect(messageLog[0].roomname).to.equal("main");
        // done();
      });
    });
  });
});
