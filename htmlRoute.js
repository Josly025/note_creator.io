// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // HTML GET Request -- Below code handles when users "visit" a page --> show the content

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/notes.html"));
  });

  // If no matching route is found default to home (index.html file)
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
  });
};
