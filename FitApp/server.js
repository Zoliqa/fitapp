
var express = require("express"),
    app = express(),
    swig = require("swig"),
	passport = require("passport");
	LocalStrategy = require("passport-local").Strategy,
	dbUrl = "mongodb://localhost:27017/fitApp",
	bodyParser = require("body-parser"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	User = require("./models/user.js"),
	mongoose = require("mongoose");

mongoose.connect(dbUrl);

app.engine("html", swig.renderFile);

app.set("view engine", "html"); 
app.set("views", "./views");    

passport.use(new LocalStrategy({
		usernameField: "username",
		passwordField: "password"
	},
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err)
				return done(err);
				
			if (!user)
				return done(null, false, { message: "Incorrect username." });
				
			if (user.password !== password)
				return done(null, false, { message: "Incorrect password." });
				
			return done(null, user);
		});
	})
);

passport.use("register", new LocalStrategy({
		passReqToCallback: true
	},
	function (req, username, password, done) {
		var profile = req.body;
    		
    	User.findOne({ username: profile.username }, function (err, user) {
    		if (user) {
			console.log("User " + user.username + " already exists");
			
    			return done(null, false);
    		}
    		else {
				var user = new User();
			
				user.username = profile.username;
				user.password = profile.password;
				user.firstname = profile.firstname;
				user.lastname = profile.lastname;
				user.emailAddress = profile.emailAddress;
				user.gender = profile.gender;
				user.birthdate = new Date(profile.birthdate)
    		
				user.save(function (err) { 
    				if (err) {
    					console.log('Error in saving user: ' + err);
    		    		throw err; 
    				}
    						
    				console.log("user saved");
    				return done(null, user);
    			});
    		}
    	});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {
	User.findOne({ username: username }, function (err, user) { 
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
	res.render("index");
});

app.post("/login", function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err)
			return next(err);
		
		if (!user)
			return res.json({ success: false });
		
		req.logIn(user, function (err) {
			if (err)
				return next(err);
			
			return res.json({ success: true });
		});
	})(req, res, next);
});

app.get("/logout", function (req, res) {
	req.logout();
	res.json({ success: true });
});

app.post("/register", function (req, res, next) {
	passport.authenticate('register', function (err, user, info) {
		if (err)
			return next(err);

		if (!user)
			return res.json({ success: false, message: "User with the given name already exists" });

		req.logIn(user, function (err) {
			if (err)
				return next(err);
			
			return res.json({ success: true });
		});
	}) (req, res, next);
});

app.get("/users", isAuthenticated, function (req, res) { 
	res.json({ user1: "user1", user2: "user2" });
});

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;