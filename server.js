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

// Displays all characters
app.get("/addreservation", function(req, res) {
    res.sendFile(path.join(__dirname, "addreservation.html"));
});






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  