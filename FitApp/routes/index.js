
var express = require('express');
var router = express.Router();

function init() {
	router.get("/", function (req, res) {
		res.render("index");
	});

	return router;
}

module.exports = init;