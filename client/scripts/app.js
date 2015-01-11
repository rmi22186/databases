// YOUR CODE HERE:

/////////////////////////////////////////////////////////////////////////////
// Backbone-based Implementation of chatterbox client
/////////////////////////////////////////////////////////////////////////////

// var Message = Backbone.Model.extend({
//   url: 'http://127.0.0.1:3000/classes/messages/',
//   defaults: {
//     username: ''
//   }
// });

// var Messages = Backbone.Collection.extend({
//   model: Message,
//   url: 'http://127.0.0.1:3000/classes/messages',

//   loadMsgs: function(){
//     this.fetch({data: { order: '-createdAt' }});
//   },

//   parse: function(response, options){
//     var results = [];
//     for( var i = response.results.length-1; i >= 0; i-- ){
//       results.push(response.results[i]);
//     }
//     return results;
//   }
// });

// var FormView = Backbone.View.extend({

//   initialize: function(){
//     this.collection.on('sync', this.stopSpinner, this);
//   },

//   events: {
//     'submit #send': 'handleSubmit'
//   },

//   handleSubmit: function(e){
//     e.preventDefault();

//     this.startSpinner();

//     var $text = this.$('#message');
//     this.collection.create({
//       username: window.location.search.substr(10),
//       text: $text.val()
//     });
//     $text.val('');
//   },

//   startSpinner: function(){
//     this.$('.spinner img').show();
//     this.$('form input[type=submit]').attr('disabled', "true");
//   },

//   stopSpinner: function(){
//     this.$('.spinner img').fadeOut('fast');
//     this.$('form input[type=submit]').attr('disabled', null);
//   }

// });

// var MessageView = Backbone.View.extend({

//   template: _.template('<div class="chat" data-id="<%- objectId %>"> \
//                        <div class="user"><%- username %></div> \
//                        <div class="text"><%- text %></div> \
//                        </div>'),

//   render: function(){
//     this.$el.html(this.template(this.model.attributes));
//     return this.$el;
//   }

// });

// var MessagesView = Backbone.View.extend({

//   initialize: function(){
//     this.collection.on('sync', this.render, this);
//     this.onscreenMessages = {};
//   },

//   render: function(){
//     this.collection.forEach(this.renderMessage, this);
//   },

//   renderMessage: function(message){
//     if( !this.onscreenMessages[message.get('objectId')] ){
//       var messageView = new MessageView({model: message});
//       this.$el.prepend(messageView.render());
//       this.onscreenMessages[message.get('objectId')] = true;
//     }
//   }

// });


/////////////////////////////////////////////////////////////////////////////
// jQuery-based Implementation of chatterbox client
/////////////////////////////////////////////////////////////////////////////
var username = window.prompt();

var user = {
  username: username
};

app = {

    server: '//localhost:3000',

    sendUsername: function(username){
      console.log(username)
      $.ajax({
        type: 'POST',
        url: app.server + '/classes/users',
        data: JSON.stringify(user), //JSON.stringify takes an object argument
        contentType: 'application/json',
        success: function(json){
          console.log("Successfully sent!")
        },
        error: function() {
          console.log('error sending username')
        }
      });
    },

    init: function() {
      // console.log('running chatterbox');
      // Get username
      app.username = username;
      app.sendUsername(username);
      app.onscreenMessages = {};

      // cache some dom references
      app.$text = $('#message');

      // app.loadMsgs();
      // setInterval( app.loadMsgs.bind(app), 2000);

      $('#send').on('submit', app.handleSubmit);
    },

    handleSubmit: function(e){
      e.preventDefault();
      // var userid = Math.floor(Math.random()*1000)
      var message = {

        // messageid: Math.floor(Math.random()*1000),
        // userid: userid,
        message: app.$text.val()
        // objectId: Math.floor(Math.random() * 10000).toString(),
        // createdAt: new Date(),
        // updateAt: new Date()
      };


      app.$text.val('');

      app.sendMsg(message);
    },

    renderMessage: function(message){
      var $user = $("<div>", {class: 'user'}).text(window.username);
      var $text = $("<div>", {class: 'text'}).text(message.message);
      var $message = $("<div>", {class: 'chat' }).append($user, $text);
      return $message;
    },

    displayMessage: function(message){
      // if( !app.onscreenMessages[message.objectId] ){
        console.log(message);
        var $html = app.renderMessage(message);
        $('#chats').prepend($html);
        // app.onscreenMessages[message.objectId] = true;
      // }
    },

    displayMessages: function(messages){
      $('#chats').html('');
      for( var i = 0; i < messages.length; i++ ){
        console.log(messages[i]);
        app.displayMessage(messages[i]);
      }
    },

    loadMsgs: function(){
      $.ajax({
        url: app.server + '/classes/messages',
        // data: { order: '-createdAt' },
        contentType: 'application/json',
        success: function(json){
          var showMessages = JSON.parse(json);
          app.displayMessages(showMessages);
          console.log('successfully loaded');
        },
        complete: function(){
          app.stopSpinner();
        },
        error: function() {
          console.log('error loading')
        }
      });
    },

    sendMsg: function(message){
      app.startSpinner();
      $.ajax({
        type: 'POST',
        url: app.server + '/classes/messages',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(json){
          console.log("Successfully sent!")
        },
        complete: function(){
          app.stopSpinner();
          // console.log('fail')
        },
        error: function() {
          console.log('error sending messages')
        }
      });
    },

    startSpinner: function(){
      $('.spinner img').show();
      $('form input[type=submit]').attr('disabled', "true");
    },

    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
      $('form input[type=submit]').attr('disabled', null);
    }
};
