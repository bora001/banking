const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("this is server");
});

app.use((req, res) => {
  res.send("this is server Page");
});
