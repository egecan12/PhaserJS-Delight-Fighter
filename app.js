  
var express = require("express");
const path = require("path")
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
require('dotenv').config();


mongoose.Promise = global.Promise;


// Mongo access
mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.error(`Error: ${err}`));
var nameSchema = new mongoose.Schema({
  firstName: String,
  score: Number,
});



var User = mongoose.model("User", nameSchema);



app.use(express.static(path.join(__dirname, "/")))


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  
});


app.get('/scores', function(req, res, next) {
	User.find().sort({score:-1}).limit(5).then(function(users) {
    
    res.json(users);

	});
});


app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
      .then(item => {
          return res.redirect('/');

        })
      .catch(err => {
          res.status(400).send(err);
          
      });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});