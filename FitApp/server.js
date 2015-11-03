
var express = require("express"),
    app = express(),
    swig = require("swig"),
	passport = require("passport");
	LocalStrategy = require("passport-local").Strategy,
	MongoClient = require('mongodb').MongoClient,
	dbUrl = 'mongodb://localhost:27017/fitApp',
	bodyParser = require("body-parser"),
	session = require('express-session'),
	cookieParser = require('cookie-parser');
var db;

MongoClient.connect(dbUrl, function (err, database) {
	db = database;
});

app.engine("html", swig.renderFile);

app.set("view engine", "html"); 
app.set("views", "./views");    

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function (username, password, done) {
		db.collection("users").findOne({ name: username }, function (err, user) {
			if (err)
				return done(err);
				
			if (!user)
				return done(null, false, { message: 'Incorrect username.' });
				
			if (user.password !== password)
				return done(null, false, { message: 'Incorrect password.' });
				
			return done(null, user);
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.name);
});

passport.deserializeUser(function (name, done) {
	db.collection("users").findOne({ name: name }, function (err, user) { 
		done(null, user);
	});
});

app.use(session({ secret: "secret" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	
	res.status(401).json({ message: "Unauthorized" });
}

app.use("/public", express.static(__dirname + "/public")); 

app.get("/", function (req, res) {
	res.render('index');
});

app.post('/login', passport.authenticate('local'), function (req, res) {
	if (req.user)
		res.json({ok: true});
	else
		res.json({ok: false});
});

app.get("/users", isAuthenticated, function (req, res) { 
	res.json({ user1: "user1", user2: "user2" });
});

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;