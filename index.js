const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler.js");
const router = require("./routes/tours.route");
const dbConnect = require("./dbConnect");

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// database connection
dbConnect();

// route
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Tour server is running");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
