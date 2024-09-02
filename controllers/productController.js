const Product = require("../models/product.model");

exports.getProductById = async (_id) => {
  return Product.find({ _id });
};

exports.getProduct = async () => {
  return Product.find({});
};

exports.createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json({
      message: "",
      product: product,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

exports.updateProduct = async (_id, updateObject) => {
  return Product.findOneAndUpdate({ _id }, updateObject, {
    upsert: false,
    new: true,
  });
};

exports.deleteProduct = async (_id) => {
  return Product.findOneAndDelete({ _id });
};
