const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/CartController.js");

router.get("/carts", cartControllers.getAllProductsInCart);
router.get("/carts/:id", cartControllers.getProductInCartById);
router.post("/carts/", cartControllers.addProductToCart);
router.put("/carts/:id", cartControllers.updateProductInCart);
router.delete("/carts/:id", cartControllers.deleteProductInCart);
router.delete("/carts/deleteAll", cartControllers.deleteAllProductsInCart);

module.exports = router;
