var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');


module.exports = {
  messages: {
    //with a get request from a messages url
    get: function (request, response) { // a function which handles a get request for all messages
      models.messages.get(function(data) {
        response.end(JSON.stringify(data))
      })
    },

    //with a post request from a messages url
    post: function (request, response) {
      // console.log(request.body)
      models.messages.post(request.body)
      // })

      //if we remove body-parser, the below is equivalent to request.body
      // request.on('data', function(result) {
      //   console.log(JSON.parse(result));
      // })
    }
  },

  users: {
    // Ditto as above
    get: function (request, response) {
      models.users.get(function(data){
        response.end(JSON.stringify(data));
      });

    },
    post: function (request, response) {
      models.users.get(function(data){

        var tableName = 'users'
        var queryString = 'SELECT * FROM ' + tableName + ' WHERE username = ' + '"' + request.body.username + '"';
        console.log(queryString);
        db.connection.query(queryString, function(err, results) {
          console.log(results)
            if (!results) {
              models.users.post(request.body);
            }
          });

        // for(var i = 0; i < data.length; i++){
        // // if data.users contains rob, nothing
        //   if (data[i].username === request.body){
        //     return;
        //   }
        // }
        // models.users.post(request.body);
      });
      // request.on('data', function(result) {
      //   console.log(JSON.parse(result));
      //   models.users.post(JSON.parse(result));
      // })
    }
  }
};
