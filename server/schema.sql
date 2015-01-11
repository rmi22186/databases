DROP database chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageid int NOT NULL AUTO_INCREMENT,
  userid int,
  message varchar(100),
  PRIMARY KEY (messageid)
);



CREATE TABLE users (
  userid int NOT NULL AUTO_INCREMENT,
  username varchar(20),
  PRIMARY KEY (userid)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/



-- INSERT INTO users (username) VALUES ('hou'), ('rob'),('wes'),('andrew');
-- INSERT INTO messages (message) VALUES ('hey i love programming');
