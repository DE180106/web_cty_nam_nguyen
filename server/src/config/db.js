const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/react_express_mongodb";

  await mongoose.connect(mongoUri);
  console.log("Kết nối MongoDB thành công");
};

module.exports = connectDB;
