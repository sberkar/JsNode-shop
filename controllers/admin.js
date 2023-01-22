const productModel = require("../models/product")


exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/products"
    })
}

exports.postAddProduct = (req, res, next) => {
    let productData = new productModel(req.body.title, req.body.price, req.body.image, req.body.desc)
    productData.save()
    res.redirect("/admin/add-product")
}