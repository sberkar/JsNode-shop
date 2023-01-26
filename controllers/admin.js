const productModel = require("../models/product")

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render("admin/product-list", {
            pageTitle: "All Products - Admin - JsNode",
            path: "/admin/products",
            prods: products
        })
    })
}
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/products",
        edit: false
    })
}

exports.postAddProduct = (req, res, next) => {
    let productData = new productModel(req.body.title, req.body.price, req.body.image, req.body.desc)
    productData.save()
    res.redirect("/admin/edit-product")
}

exports.getEditProduct = (req, res, next) => {
    let editMode = req.query.edit;
    let productID = req.params.productid;
    if(!editMode) return res.redirect("/")
    productModel.findByID(productID, product => {
        if(product.id == undefined){
            return res.redirect("/")
        }
        res.render("admin/edit-product", {
            edit: editMode,
            productData: product,
            pageTitle: "edit - " + product.title + " - JsNode",
            path: "/admin/add-product"
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    productModel.editProduct(req.body);
    res.redirect("/admin/products")
}

exports.postDeleteProduct = (req, res, next) => {
    let productid = req.body.productid;
    productModel.deleteProduct(productid);
    res.redirect("/admin/products")
}
