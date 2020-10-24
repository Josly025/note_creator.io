const path = require("path");
const fs = require("fs");

///
module.exports = function (app) {
  //=========================== API REQUESTS =======================================

  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let content = JSON.parse(data);
    console.log("This is content (11): " + JSON.stringify(content));

    //GET /api/notes --RETURN  all notes in JSON
    app.get("/api/notes", function (req, res) {
      res.json(content);
    });

    app.post("/api/notes", function (req, res) {
      let createNote = req.body;
      content.push(createNote);
      noteCreation(content);
      console.log("Posting note: (30) " + createNote.title);
    });
    // Retrieves a note with specific id
    app.get("/api/notes/:id", function (req, res) {
      res.json(content[req.params.id]);
      console.log("line 27 " + content[req.params.id]);
    });
    //DELETE
    app.delete("/api/notes/:id", function (req, res) {
      content.splice(req.params.id, 1);
      noteCreation();
      console.log("Deleted note: " + req.params.id);
    });
    //POST /api/notes
    //Should receive a new note to save to req.body, add it to the db.jSON file, and then return the new note to the client

    // HTML GET Requests -- Below code handles when users "visit" a page --> show the content
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "./public/index.html"));
    });
    //function to write the notes to JSON file - for adding or deleting notes
    function noteCreation() {
      fs.writeFile("db/db.json", JSON.stringify(content, "\t"), (err) => {
        console.log("writing FILE");
        if (err) throw err;
        return true;
      });
    }
  });
};
