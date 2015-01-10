var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    //with a get request from a messages url
    get: function (request, response) { // a function which handles a get request for all messages
      models.messages.get(function(data) {
        response.end(JSON.stringify(data))
      })
    },

    //with a post request from a messages url
    post: function (request, response) { // a function which handles posting a message to the database
      //post each of the
      // request.on('data', function(chunk){
      console.log('message post?')
      res.end("hello world");

    }
  },

  users: {
    // Ditto as above
    get: function (request, response) {},
    post: function (request, response) {}
  }
};
