var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    //with a get request from a messages url
    get: function (req, res) { // a function which handles a get request for all messages
      //get each of the items from the database through the model
      //send to controller to display to the user


    },

    //with a post request from a messages url
    post: function (req, res) { // a function which handles posting a message to the database
      //post each of the
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
