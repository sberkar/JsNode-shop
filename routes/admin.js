const express = require("express")

const adminController = require("../controllers/admin")
const Route_Protector = require("../middlewares/route_protector")

const router = express.Router();

router.get("/products", Route_Protector, adminController.getProducts)

router.get("/add-product", Route_Protector, adminController.getAddProduct)
router.post("/add-product", Route_Protector, adminController.postAddProduct)

router.get("/edit-product/:productid", Route_Protector, adminController.getEditProduct)
router.post("/edit-product", Route_Protector, adminController.postEditProduct)


router.post("/delete-product", Route_Protector, adminController.postDeleteProduct)

module.exports = router;