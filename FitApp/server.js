
var express = require("express"),
    app = express(),
    swig = require("swig"),
	passport = require("passport");
	LocalStrategy = require("passport-local").Strategy,
	MongoClient = require('mongodb').MongoClient,
	dbUrl = 'mongodb://localhost:27017/fitApp',
	bodyParser = require("body-parser"),
	session = require('express-session');

MongoClient.connect(dbUrl, function (err, db) {
	console.log("Connected correctly to server");
	
	db.close();
});

app.engine("html", swig.renderFile);

app.set("view engine", "html"); 
app.set("views", "./views");    

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function (username, password, done) {
		MongoClient.connect(dbUrl, function (err, db) {
			db.collection("users").findOne({ name: username }, function (err, user) {
				if (err)
					return done(err);
				
				if (!user)
					return done(null, false, { message: 'Incorrect username.' });
				
				if (user.password !== password)
					return done(null, false, { message: 'Incorrect password.' });
				
				return done(null, user);
			});
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.name);
});

passport.deserializeUser(function (name, done) {
	MongoClient.connect(dbUrl, function (err, db) {
		db.collection("users").findOne({ name: name }, function (err, user) { 
			done(null, user);
			
			db.close();
		});
	});
});

app.use(session({ secret: "secret" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.render('index');
});

app.post('/login', passport.authenticate('local'), function (req, res) {
	if (!req.user)
		res.send("{ success: false }");
	else
		res.send("{ success: true }");

	res.end();
});

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;