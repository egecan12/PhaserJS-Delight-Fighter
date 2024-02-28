require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const scoresController = require("./routes/scoresController");
const dbConnection = require("./data/db");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(scoresController);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
