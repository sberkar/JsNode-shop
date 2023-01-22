const express = require("express")

const productController = require("../controllers/shop")
const router = express.Router()

router.get("/", productController.getHome)
router.get("/products", productController.getProducts)


module.exports = router;