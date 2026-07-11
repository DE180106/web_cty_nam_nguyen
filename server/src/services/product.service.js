const Product = require("../models/product");

const getProducts = async (query) => {
  const filter = {};

  if (query.keyword) {
    filter.name = {
      $regex: query.keyword,
      $options: "i"
    };
  }

  return Product.find(filter).sort({ createdAt: -1 });
};

const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Không tìm thấy sản phẩm");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

const createProduct = async (productData) => {
  return Product.create(productData);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct
};
