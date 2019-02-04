// modules
var express = require("express");

// files
var router = require("./router");
var database = require("./database/database");

const port = 3000;

var app = express();
database.connect("form_db");
app.use("/", router.Router);

app.listen(port, () => console.log(`listening to ${port}`));
