var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // console.log('inside get')
      var tableName = 'messages'
      var queryString = 'SELECT t1.message, t2.username FROM messages AS t1 INNERJOIN users AS t2 ON t1.userid = t2.userid';
      db.connection.query(queryString, function(err, results) {
          callback(results)
          if (err) throw err;
        });
    }, // a function which produces all the messages

    post: function (data) {
      var tableName = 'messages'
      var queryString = 'INSERT INTO ' + tableName + '(message) VALUES(?)';
      var queryArgs = [data.message];
      var query = db.connection.query(queryString, queryArgs, function(err, results) {
          if (err) throw err;
        });
      console.log(query.sql)
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var tableName = 'users'
      var queryString = 'SELECT * FROM ' + tableName + ' ?';
      var queryArgs = {};
      db.connection.query(queryString, queryArgs, function(err, results) {
          callback(results)
          if (err) throw err;
        });
    },
    post: function (data) {
      var tableName = 'users'
      var queryString = 'INSERT INTO ' + tableName + '(username) VALUES(?)';
      var queryArgs = [data.username];
      var query = db.connection.query(queryString, queryArgs, function(err, results) {
          if (err) throw err;
        });
    }

  }
};

