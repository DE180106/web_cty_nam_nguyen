require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/product");

const seedProducts = [
  {
    name: "Táo Fuji",
    description: "Táo giòn, ngọt.",
    price: 85000,
    stock: 50
  },
  {
    name: "Cam vàng",
    description: "Cam mọng nước.",
    price: 65000,
    stock: 40
  }
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    console.log("Seed dữ liệu thành công");
    process.exit(0);
  } catch (error) {
    console.error("Seed thất bại:", error);
    process.exit(1);
  }
};

seed();
