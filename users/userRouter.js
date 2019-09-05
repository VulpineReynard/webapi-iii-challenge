const express = require('express');
const router = express.Router();
const userHelper = require('./userDb');
const postHelper = require('../posts/postDb');

///// BASE USERS ENDPOINT /////
router.route("/")
// add user
.post(validateUser, function rootPostController(req, res){
  let newUser = req.body;
  userHelper.insert(newUser)
    .then(id => {
      res.status(201).json(id);
    })
})
// get all users
.get(function rootGetController(req, res){
  userHelper.get()
    .then(users => {
      if (users) {
        res.status(200).send(users);
      } else {
        res.status(404).json({ error: "User doesn't exist." })
      }
    })
    .catch(err => {
      console.log(err);
    })
})


///// USERS BY ID ENDPOINT /////
router.route("/:id")
// get specific user
.get(validateUserId, function idGetController(req, res){
  userHelper.getById(req.params.id)
    .then(user => {
      res.status(200).send(user);
    })
})
// delete specific user
.delete(validateUserId, function idDeleteController(req, res){
  userHelper.remove(req.params.id)
    .then(data => {
      res.status(200).send('Resourse deleted successfully.');
    })
})
// update specific user
.put(validateUserId, function idPutController(req, res) {
  userHelper.update(req.params.id, req.body)
    .then(count => {
      res.status(200).send('Updated Sucessfully.');
    })
})


///// POSTS OF USER BY ID /////
router.route("/:id/posts")
// get user's posts
.get(validateUserId, function postWithIdGetController(req, res) {
  postHelper.get()
    .then(posts => {
      let targetPosts = posts.filter(post => post.user_id === 1)
      res.status(200).send(targetPosts);
    })
})
// create a post
.post(validateUserId, validatePost, function postWithIdPostController(req, res) {
  let newPost = req.body;
  newPost.user_id = req.user;
  console.log(newPost);
  postHelper.insert(newPost)
    .then(returned => {
      res.status(201).send(returned);
    })
})

// <----- CUSTOM MIDDLEWARE ----->

// validates the user id given is valid
function validateUserId(req, res, next) {
  let id = req.params.id;
  userHelper.getById(id)
    .then(user => {
      req.user = id;
      next();
    })
    .catch(err => {
      res.status(400).send('Invalid ID');
    })
};

// check new user request object
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).send({ message: "Missing user data" })
  } else if (req.body && !req.body.name) {
    res.status(400).send({ message: "Missing required name field" })
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  next();
};

module.exports = router;
