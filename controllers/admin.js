const Product = require("../models/Product")

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render("admin/product-list", {
            pageTitle: "All Products - Admin - JsNode",
            path: "/",
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
    let productData = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        desc: req.body.desc
    })
    productData.save().then(result => {
        res.redirect("/admin/add-product")
    }).catch(err => {
        console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
    let editMode = req.query.edit;
    let productID = req.params.productid;
    if(!editMode) return res.redirect("/")
    Product.findById({_id: productID}).then(product => {
        if(!product) return res.redirect("/admin/products")
        res.render("admin/edit-product", {
            pageTitle: "Edit - " + product.title + " - JsNode",
            path: "/admin/edit",
            productData: product,
            edit: editMode
        })
    }).catch(err => {
        return res.redirect("/admin/products")
    })
    
}

exports.postEditProduct = (req, res, next) => {
    Product.findById({_id: req.body.productid}).then(product => {
        product.title = req.body.title
        product.price = req.body.price
        product.image = req.body.image
        product.desc = req.body.desc
        return product.save()
    })
    .then(() => {
        res.redirect("/admin/products")
    }).catch(err => {
        console.log(err)
    });
}

exports.postDeleteProduct = (req, res, next) => {
    let productid = req.body.productid;
    Product.deleteOne({_id: productid}).then(() => {
        res.redirect('/admin/products')
    }).catch(err => console.log(err))
}