const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_TOUR}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database connection is successful"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
