const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production" ? process.env.DATABASE_URI : "mongodb://localhost:27017",
      {
        dbName: "products",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
