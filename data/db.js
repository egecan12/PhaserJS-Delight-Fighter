var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Mongo access
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(`Error: ${err}`));

module.exports = { mongoose };
