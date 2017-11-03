// ===========================
// PACKAGES
// ===========================


const express = require("express");
// handlebase view engine for rendering templates
const hbs = require("hbs"); 
const fs = require("fs");

// ===========================
// APP CONFIGURATION
// ===========================


var app = express();
// set view engine to handlebars
app.set("view engine", "hbs"); 
// registers middleware with the built-in express method "use"
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${req.method} request made for page "${req.url}" on ${now}`;
	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if(err) {
			console.log("Unable to write server.log");
		}
	});
	next();
});
// serve public directory by concatenating the node variable __dirname (which stores the absolute path of the current directory) with the public directory
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	res.render("errors.hbs");
});

// ===========================
// HANDLEBARS HELPERS
// ===========================

// serve views directory with handlebars
hbs.registerPartials(__dirname + "/views/partials");

// register a handlebars function that returns the full year so that it does not have to be passed into every route
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("shout", (text) => {
	return text.toUpperCase();
});


// ===========================
// ROUTES
// ===========================


app.get("/", (req, res) => {
	res.render("home.hbs", {
		page: "Home",
		welcome: "Hello!"
	});
});

app.get("/about", (req, res) => {
	// express automatically renders files in the views directory so only the filename needs to be specified
	res.render("about.hbs", {
		page: "About"
	});
});

app.get("/help", (req, res) => {
	// express automatically renders files in the views directory so only the filename needs to be specified
	res.render("help.hbs", {
		page: "Help"
	});
});

app.listen(3000, () => {
	console.log("Server Initiated......");
})