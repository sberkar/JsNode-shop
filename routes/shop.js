const express = require("express")

const productController = require("../controllers/shop")
const router = express.Router()

router.get("/", productController.getHome)

router.get("/products", productController.getProducts)
router.get("/product/:productID", productController.getProduct)

router.get("/cart", productController.getCart)
router.post("/cart", productController.postCart)

router.post("/cart/delete", productController.deleteCartProduct)

router.get("/orders", productController.getOrders)
router.post("/orders", productController.postOrders)

module.exports = router;