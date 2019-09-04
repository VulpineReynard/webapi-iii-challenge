const express = require('express');

const router = express.Router();

// BASE USERS ENDPOINT
router.route("/")
// add user
.post(function rootPostController(req, res){
  
})
// get all users
.get(function rootGetController(req, res){
  res.status(200).send('Root usersRouter');
})

// USERS BY ID ENDPOINT
router.route("/:id")
// get specific user
.get(function idGetController(req, res){

})
// delete specific user
.delete(function idDeleteController(req, res){

})
// update specific user
.put(function idPutController(req, res) {

})

// POSTS OF USER BY ID
router.route("/:id/posts")
// get user's posts
.get(function postWithIdGetController(req, res) {

})
// create post
.post(function postWithIdPostController(req, res) {

})

// <----- CUSTOM MIDDLEWARE ----->

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
