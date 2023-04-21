const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// All of these routes are prepended with '/api'
router.get("/notes", (req, res) => {
    // What happend here (What logic do we consider?)
 
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
    // We need to read the file and then parse the data
});

// this our CREATE route
router.post("/notes", (req, res) => {
    console.log("Req Body: ", req.body);
    console.log("Req Body Type: ", req.body);
    // First I would check that we got the data from the FORM(client)
    res.json(req.body);
 
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
});


router.delete("/notes/:id", (req, res) => {
    console.log("Req Params: ", req.params);  // { id: 'kjhsdf0-kjhsdfkjhse-w9872341' }

});


module.exports = router;

