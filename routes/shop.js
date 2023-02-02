const express = require("express")

const productController = require("../controllers/shop")
const Route_Protector = require("../middlewares/route_protector")
const router = express.Router()

router.get("/", productController.getHome)

router.get("/products", productController.getProducts)
router.get("/product/:productID", productController.getProduct)

router.get("/cart", Route_Protector, productController.getCart)
router.post("/cart", Route_Protector, productController.postCart)

router.post("/cart/delete", Route_Protector, productController.deleteCartProduct)

router.get("/orders", Route_Protector, productController.getOrders)
router.post("/orders", Route_Protector, productController.postOrders)

module.exports = router;