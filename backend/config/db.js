const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database successfully!");
  } catch (err) {
    console.log("Mongodb connection failed!", err);
    process.exit(1);
  }
};

module.exports = connectDb;
