const carts = require("../models/CartModel.js");

const getAllProductsInCart = async (req, res) => {
  try {
    const allProductsInCart = await carts.find({});
    res.json(allProductsInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductInCartById = async (req, res) => {
  try {
    const productInCart = await carts.findById(req.params.id);
    res.json(productInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const product = new carts({
    productId: req.body.productId,
    imageUrl: req.body.imageUrl,
    title: req.body.title,
    quantity: req.body.quantity,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProductInCart = async (req, res) => {
  try {
    const product = await carts.findById(req.params.id);
    if (product) {
      product.quantity = req.body.quantity || product.quantity;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const product = await carts.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllProductsInCart = async (req, res) => {
  try {
    const product = await carts.deleteMany({});
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProductsInCart,
  getProductInCartById,
  addProductToCart,
  updateProductInCart,
  deleteProductInCart,
  deleteAllProductsInCart,
};
