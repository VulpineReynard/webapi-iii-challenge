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
    .catch(err => {
      res.status(400).send({ message: "Something went wrong." })
    })

})
// delete specific user
.delete(validateUserId, function idDeleteController(req, res){

  userHelper.remove(req.params.id)
    .then(data => {
      res.status(200).send('Resourse deleted successfully.');
    })
    .catch(err => {
      res.status(400).send({ message: "Something went wrong." })
    })

})
// update specific user
.put(validateUserId, function idPutController(req, res) {

  userHelper.update(req.params.id, req.body)
    .then(count => {
      res.status(200).send('Updated Sucessfully.');
    })
    .catch(err => {
      res.status(400).send({ message: "Something went wrong." })
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
    .catch(err => {
      res.status(400).send({ message: "Something went wrong." })
    })

})
// create a post
.post(
  validateUserId, 
  validatePost, 
  function postWithIdPostController(req, res) {

  req.body.user_id = req.user;
  postHelper.insert(req.body)
    .then(returned => {
      res.status(201).send(returned);
    })
    .catch(err => {
      res.status(400).send({ message: "Something went wrong." })
    })

})

// <----- CUSTOM MIDDLEWARE ----->

// validates the user id given is valid
function validateUserId(req, res, next) {
  const { id } = req.params;
  userHelper.getById(id)  
    .then(user => {
      req.user = user;
    })
    .catch(err => {
      res.status(400).send("Invalid User Id")
    })
    next();
};

// check new user request object
function validateUser(req, res, next) {
  const { name } = req.body;
  if (isEmpty(req.body)) {
    res.status(400).send({ message: "Missing user data" })
  } else if (req.body && !name) {
    res.status(400).send({ message: "Missing required name field" })
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  const { text } = req.body;
  if (isEmpty(req.body)) {
    res.status(400).send({ message: "Missing user data" })
  } else if (req.body && !text) {
    res.status(400).send({ message: "Missing required name field" })
  } else {
    next();
  }
};

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

module.exports = router;
