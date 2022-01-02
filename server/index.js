require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("server is connected...");
});

app.use((req, res) => {
  res.send("this is server Page");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected..."))
  .catch((err) => console.log(err));
