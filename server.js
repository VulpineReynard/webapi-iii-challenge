const express = require('express');
const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

// <----- GLOBAL MIDDLEWARE ----->
server.use(express.json());

// <----- CUSTOM MIDDLEWARE ----->
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const now = new Date();
  console.log('--------------------');
  console.log(`request path: ${req.path}`);
  console.log(`type of request: ${req.method}`);
  console.log('requested @ ', now);
  next();
};

module.exports = server;
