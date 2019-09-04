const express = require('express');

const router = express.Router();


router.route("/")
.get(function rootGetController(req, res) {
  res.status(200).send('Root postsRouter');
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