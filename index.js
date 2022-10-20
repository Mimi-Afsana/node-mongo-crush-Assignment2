const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tour server is running");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
