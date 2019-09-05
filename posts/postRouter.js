const express = require('express');
const postHelper = require('./postDb');
const router = express.Router();


router.route("/")
.get(function rootGetController(req, res) {
  postHelper.get() 
    .then(posts => {
      res.status(200).send(posts);
    })
});

router.route("/:id")
.get(function idGetController(req, res) {

})
.delete(function idDeleteController(req, res) {

})
.put(function idPutController(req, res) {
    
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;