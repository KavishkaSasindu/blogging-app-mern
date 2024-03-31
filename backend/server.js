const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/UserRoutes");

const app = express();
require("dotenv").config();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// server connection and db connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.5df3ur3.mongodb.net/blog_mern
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

// routs
app.use(UserRoutes);
