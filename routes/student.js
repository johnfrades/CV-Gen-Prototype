var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var AuthKey = require('../models/authkey');


router.get('/allstudent', function(req, res){
	Student.find({}, function(err, allStudent){
		if(err){
			console.log(err);
		} else {
			res.send(allStudent);
		}
	});
});


router.get('/student', function(req, res){
	res.render('student');
});


router.post('/register', function(req, res){
	var theStudentInfo = req.body.student;
	var newStudent = new Student(theStudentInfo);

	Student.register(newStudent, req.body.thepassword, function(err, registerStudent){
		console.log(registerStudent);
		if(err){
			console.log(err);
		} else {
			AuthKey.findOneAndUpdate({'studentid': theStudentInfo.username}, {$set: {'used': true}}, function(err, Updated){
				if(err){
					console.log(err);
				} else {
					res.send(registerStudent);
				}
			})
		}
	});
});

module.exports = router;