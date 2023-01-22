const productModel = require("../models/product")

exports.getHome = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render("shop/index", {
            pageTitle: "JsNode: Shop Without Limit",
            prods: products,
            path: "/"
        })
    })
}

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "Products - JsNode",
            prods: products,
            path: "/products"
        })
    })
}
