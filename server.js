//npm package express dependency
const express = require("express");
const app = express();
const { fstat } = require("fs");

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080; //able to use with heroku

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //Future Reference: static html or include Dir

require("./serverRoutes.js")(app); //external file for HTML and API routes

//Starts listening to the port and starts server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
