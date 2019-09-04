const express = require('express');
const router = express.Router();
const userHelper = require('./userDb');

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
  res.status(200).send(req.user)
})
// delete specific user
.delete(function idDeleteController(req, res){

})
// update specific user
.put(function idPutController(req, res) {

})


///// POSTS OF USER BY ID /////
router.route("/:id/posts")
// get user's posts
.get(function postWithIdGetController(req, res) {

})
// create post
.post(function postWithIdPostController(req, res) {

})

// <----- CUSTOM MIDDLEWARE ----->

// validates the user id given is valid
function validateUserId(req, res, next) {
  let id = req.params.id;
  userHelper.getById(id)
    .then(user => {
    res.status(200).send(user);
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
  
};

module.exports = router;
