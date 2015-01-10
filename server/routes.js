var controllers = require('./controllers');
var router = require('express').Router();


//goes into /.controllers to iterate through {messages: {get:, post}, users: {get:, post;}
for (var path in controllers) {
  //when the route is /messages, iterate on messages object
  router.route("/" + path)
    //on the /get key,//handle the get requests
    .get(controllers[path].get)
    // on the /post key, handle the post request
    .post(controllers[path].post);


}

module.exports = router;

