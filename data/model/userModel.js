var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
  firstName: String,
  score: Number,
  date: Date,
});
var User = mongoose.model("User", nameSchema);

module.exports = { User };
