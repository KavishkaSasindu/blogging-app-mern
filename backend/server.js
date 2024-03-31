const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// server connection and db connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.1gilyli.mongodb.net/blog
    `
  )
  .then((result) => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
