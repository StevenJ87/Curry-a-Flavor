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


let table = JSON.parse(fs.readFileSync("tables.json", "utf8"));
let waitlist = JSON.parse(fs.readFileSync("waitlist.json", "utf8"));

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
  
// Displays api clear
app.post("/api/clear", function(req, res) {

  table = [];


  //Writes the JSON data back to db.json
fs.writeFileSync("tables.json", JSON.stringify(table));
res.json(table);
  
});


//Post API to save JSON data====================================================
app.post("/api/tables", function(req, res) {

    // Parses through the object
  

  if(table.length < 5){

    table.push(req.body);
    res.json(true);
  }
  else{

    waitlist.push(req.body);
    res.json(false);
  }
  
  
//Writes the JSON data back to db.json
fs.writeFileSync("tables.json", JSON.stringify(table));
res.json(table);
  })

//Get JSON data from waitlist=========================================
app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  