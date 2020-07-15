//Require all necessary components
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

//Port
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Routes
// =============================================================
//Route to get index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "homeview.html"));
    });
  
    
//Routes to get to tables html
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
    });

// Displays all reservations
app.get("/addreservation", function(req, res) {
    res.sendFile(path.join(__dirname, "addreservation.html"));
});

// Displays api tables
app.get("/api/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.json"));
  });
  
// Displays api waitlist
app.get("/api/waitlist", function(req, res) {
    res.sendFile(path.join(__dirname, "waitlist.json"));
  });
  

//Post API to save JSON data====================================================
app.post("/api/tables", function(req, res) {

    // Parses through the object
  let table = JSON.parse(fs.readFileSync("tables.json", "utf8"));
  
  //Add the new note to the array
  let newTable = req.body;
  table.push(newTable);
  

  
//Writes the JSON data back to db.json
fs.writeFileSync("tables.json", JSON.stringify(table));
res.json(table);
  })

//Get JSON data from waitlist=========================================
app.post("/api/waitlist", function(req, res) {

    // Parses through the object
  let waitlist = JSON.parse(fs.readFileSync("waitlist.json", "utf8"));
  
  //Add the new note to the array
  let newWaitlist = req.body;
  waitlist.push(newWaitlist);
  

  
//Writes the JSON data back to db.json
fs.writeFileSync("waitlist.json", JSON.stringify(waitlist));
res.json(waitlist);
})





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  