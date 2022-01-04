require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");

// const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  // //   // const user = new User(req.body);
  // //   // user.save((err, userInfo) => {
  // //   //   if (err) return res.json({ success: false, err });
  // //   //   return res.status(200).json({ success: true });
  // //   // });
});

// mongoose
//   .connect(process.env.mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("mongoDB is connected..."))
//   .catch((err) => console.log(err));

app.listen(3000, (req, res) => {
  console.log("server is connected...");
});
