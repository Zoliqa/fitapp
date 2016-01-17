var express = require("express"),
	swig = require("swig"),
	passport = require("passport");
	bodyParser = require("body-parser"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	mongoose = require("mongoose"),
	passportInit = require("./passport/passport.init"),
	routesIndex = require("./routes/routes.index"),
	dbUrl = "mongodb://localhost:27017/fitAppDb",
	app = express();

mongoose.connect(dbUrl);

app.engine("html", swig.renderFile);

app.set("view engine", "html");
app.set("views", "./views");

app.use(session({
	secret: "secret", 
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());

passportInit(passport);

app.use("/public", express.static(__dirname + "/public"));

routesIndex(app, passport);

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;