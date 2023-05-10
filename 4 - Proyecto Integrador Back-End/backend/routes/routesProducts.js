const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/ProductController.js");

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);
router.post("/products/", productControllers.createProduct);
router.put("/products/:id", productControllers.updateProduct);
router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;
