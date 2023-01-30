const Product = require("../models/Product");

exports.getHome = (req, res, next) => {
    Product.find().then(products => {
        res.render("shop/index", {
            pageTitle: "JsNode: Shop Without Limit",
            prods: products,
            path: "/",
        })
    })
}

exports.getProduct = (req, res, next) => {
    let productID = req.params.productID;
    Product.findById({_id: productID}).then( product => {
        if(!product) return res.redirect("/")
      res.render("shop/product-details", {
        path: "/product",
        product: product,
        pageTitle: "Buy " + product.title + " - JsNode"
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

exports.getCart = (req, res, next) => {
    User.fetchCart(req.User._id.toString(), cart => {
        res.render("shop/cart", {
            pageTitle: "Your Cart - JsNode",
            path: "/cart",
            allCartData: cart
        })
    }) 
}

exports.postCart = (req, res, next) => {
    let productid = req.body.productid;
    let uid = req.User._id.toString();
    User.addTocart(productid, uid)
    res.redirect("/cart")
}

exports.deleteCartProduct = (req, res, next) => {
    User.deleteProductFromCart(req.User._id.toString(), req.body.productid)
    res.redirect("/cart");
}
exports.getOrders = (req, res, next) => {
    getOrders(req.User._id.toString()).then(orders => {
        res.render('shop/orders', {
            pageTitle: "Your Orders - JsNode",
            path: "/orders",
            orders: orders
        })
    })
}

exports.postOrders = (req, res, next) => {
    addOrders(req.User._id.toString()).then(() => {
        find(req.User._id.toString()).then(user => {
            const db = getDb()
            return db.collection('users').updateOne({_id: user._id}, {$set: {
                cart: []
            }}).then(() => {
                res.redirect('/orders')
            })
        })
    })
}