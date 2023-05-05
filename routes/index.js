const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


// this is our READ route
router.get("/notes", (req, res) => {
  // We first need to bring in the data from the db.json file
  // We can do this by using the fs module
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // We need to parse the data
    let notes = JSON.parse(data);
    console.log("Notes: ", notes);
    console.log("type: ", typeof notes);
    // We need to send the data back to the client
    res.json(notes);
  });
  
});

// this our CREATE route
router.post("/notes", (req, res) => {
  console.log("Req Body: ", req.body);
  console.log("Req Body Type: ", typeof req.body);

  // Here we create a new note object
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  // We need to read the file and then parse the data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
     let notes = JSON.parse(data); 

    // We need to add the new note to the array
    notes.push(newNote);
    console.log("Notes: ", notes);

    // We need to write the data back to the file
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
      res.status(201).json({ message: "Note Created" });
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  console.log("Req Params: ", req.params); 

  // We need to read the file and then parse the data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // We need to parse the data
    let notes = JSON.parse(data); // object --> array

    // We need to filter out the note that we want to delete
    let filteredNotes = notes.filter((note) => {
      return note.id !== req.params.id;
    });
    console.log("Filtered Notes: ", filteredNotes);

    // We need to write the data back to the file
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
      if (err) throw err;
      console.log("The record has been removed!");
      res.status(200).json({ message: "Note Deleted" });
    });
  });
});

module.exports = router;

