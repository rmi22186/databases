var controllers = require('./controllers');
var router = require('express').Router();


//goes into /.controllers to iterate through {messages: {get:, post}, users: {get:, post;}
for (var route in controllers) {
  //when the route is /messages, iterate on messages object
  router.route("/" + route)
    //on the /get key,//handle the get requests
    .get(controllers[route].get)
    // on the /post key, handle the post request
    .post(controllers[route].post);


}

module.exports = router;

