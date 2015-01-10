var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      // console.log('inside get')
      var tableName = 'messages'
      var queryString = 'SELECT * FROM ' + tableName + ' ?';
      var queryArgs = {};
      db.connection.query(queryString, queryArgs, function(err, results) {
          // console.log('above callback')
          callback(results)
          if (err) throw err;
          // console.log('inside' + results);
        });
      // db.connection.end();
    }, // a function which produces all the messages


    post: function () {
      var tableName = 'messages'
      var queryString = 'INSERT INTO ' + tableName + ' ?';
      var queryArgs = {};
      db.connection.query(queryString, queryArgs, function(err, results) {
          if (err) throw err;
          console.log(results);
        });
      // db.connection.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}


  //   app.post('/', function(req,res) {
  //     // db.connection;
  //     // db.connection.connect;
  //     db.c();
  //   })onnection.query('INSERT into users (userid, username) VALUES (1, \'hou\')', function(err, rows, fields) {
  //       if (err) throw err;
  //       console.log(rows, fields);
  //       });
  //     // res.end('submitted');
  //     // connection.end
  }
};

