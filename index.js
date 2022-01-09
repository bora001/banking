require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/User");
const path = require("path");

// const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/client"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.localUrl + ":5500");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
  // res.send("hello world");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "We can not find the username",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "incorrect Password",
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
          loginSuccess: true,
          token: user.token,
          balance: user.balance,
          transaction: user.transaction,
        });
      });
    });
  });
});

app.post("/transfer", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.body.From,
    },
    {
      $inc: { balance: -req.body.Amount },
      $push: { transaction: req.body },
    },

    { new: true },
    (err, update) => {
      if (err) return res.status(200).json({ success: false, err });
      return res
        .status(200)
        .send({ success: true, update: true, target: req.body, update });
    }
  );
});

app.post("/loan", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.body.To,
    },
    {
      $inc: { balance: req.body.Amount },
      $push: { transaction: req.body },
    },
    { new: true },
    (err, update) => {
      if (err) return res.status(200).json({ success: false, err });
      return res
        .status(200)
        .send({ success: true, update: true, target: req.body, update });
    }
  );
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log("server is connected...");
});
