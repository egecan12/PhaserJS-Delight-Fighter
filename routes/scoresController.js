const express = require("express");
const { User } = require("../data/model/userModel");

// set up router
const router = express.Router();

router.get("/test2", (req, res) => {
  return res.status(200).send({
    success: {
      message: "you've been connected successfully!!",
    },
  });
});

router.get("/scores", function (req, res, next) {
  User.find()
    .sort({ score: -1 })
    .limit(5)
    .then(function (users) {
      res.json(users);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      return res.redirect("/");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
