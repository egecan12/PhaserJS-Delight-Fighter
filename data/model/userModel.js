var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
  firstName: String,
  score: Number,
});
var User = mongoose.model("User", nameSchema);

module.exports = { User };
