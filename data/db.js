let mongoose = require("mongoose");
require("dotenv").config();

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
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

module.exports = { mongoose };

// const uri =
//   "mongouri";

// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log("connected to mongodb");
//   } catch (error) {
//     console.log(error);
//   }
// }
// connect();
