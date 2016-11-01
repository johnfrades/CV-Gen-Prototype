var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost/prototype2');
mongoose.connect('mongodb://admin:admin@ds011890.mlab.com:11890/prototype2');





//Schema
var StudentSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	username: String,
	password: String,
	authkey: String
});


//This line very important to place it properly after the schema and before the model
StudentSchema.plugin(passportLocalMongoose);

//Model
var Student = mongoose.model('Student', StudentSchema);




//Passport Authentication
app.use(require("express-session")({
	secret: "7He$3cr37",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new passportLocal(Student.authenticate()));
passport.use(Student.createStrategy());
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());






//Routes
app.get('/', function(req, res){
	if(req.user === undefined){
		res.render('homepage');
	} else {
		res.send(req.user);
	}
});


app.post('/register', function(req, res){
	var theStudentInfo = req.body.student;

	var newStudent = new Student(theStudentInfo);

	Student.register(newStudent, req.body.thepassword, function(err, registerStudent){
		console.log(registerStudent);
		if(err){
			console.log(err);
		} else {
			res.send(registerStudent);
		}
	});
});


app.post("/login", passport.authenticate("local", {
	successRedirect: "back",
	failureRedirect: "back"
}));


app.listen(process.env.PORT, function(req, res){
	console.log('server started at PORT 3000');
});