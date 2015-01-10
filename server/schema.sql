CREATE DATABASE chat;

USE chat;

CREATE TABLE messages
  (messageid int(3),
  userid int(3),
  message varchar(100));
  -- createdAt date


CREATE TABLE users (
  userid int(3),
  username varchar(20)
);

CREATE TABLE hou (
  userid int(3),
  username varchar(20)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

