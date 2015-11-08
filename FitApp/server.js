
var express = require("express"),
    app = express(),
    swig = require("swig"),
	passport = require("passport");
	bodyParser = require("body-parser"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	mongoose = require("mongoose"),
	dbUrl = "mongodb://localhost:27017/fitApp",
	initPassport = require("./passport/init");     

mongoose.connect(dbUrl);

app.engine("html", swig.renderFile);

app.set("view engine", "html"); 
app.set("views", "./views");    

app.use(session({ secret: "secret" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser()); 
app.use(passport.session());   
 
initPassport(passport);

//var isAuthenticated = function (req, res, next) {
//	if (req.isAuthenticated())
//		return next();
	
//	res.status(401).json({ message: "Unauthorized" });      
//}

app.use("/public", express.static(__dirname + "/public"));  

var indexRoutes = require('./routes/index')();
app.use('/', indexRoutes);

var authRoutes = require("./routes/auth")(passport);
app.use("/auth", authRoutes);

var dashboardRoutes = require("./routes/dashboard")();
app.use("/dashboard", dashboardRoutes);

//app.get("/users", isAuthenticated, function (req, res) { 
//	res.json({ user1: "user1", user2: "user2" });
//});

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;