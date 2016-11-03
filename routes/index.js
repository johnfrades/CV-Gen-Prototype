var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res){
	res.render('homepage');
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/student",
	failureRedirect: "back"
}));

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});


module.exports = router;