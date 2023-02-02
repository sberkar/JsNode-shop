const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Orders")

exports.getHome = (req, res, next) => {
    Product.find().then(products => {
        res.render("shop/index", {
            pageTitle: "JsNode: Shop Without Limit",
            prods: products,
            path: "/",
            session: req.session
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
        pageTitle: "Buy " + product.title + " - JsNode",
        session: req.session
      })  
    })
}

exports.getProducts = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "Products - JsNode",
            prods: products,
            path: "/products",
            session: req.session
        })
    })
}

exports.getCart = (req, res, next) => {
    req.user
    .populate("cart.prodId")
    .then(user => {
        console.log(user.cart)
        res.render("shop/cart", {
            pageTitle: "Your Cart - JsNode",
            path: "/cart",
            allCartData: user.cart,
            session: req.session
        })
    })
}

exports.postCart = (req, res, next) => {
    let productid = req.body.productid;
    Product.findById({_id: productid}).then(product => {
        req.user.AddToCart(product).then(result => {
            res.redirect("/cart")
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteCartProduct = (req, res, next) => {
    let pid = req.body.productid;
    req.user.removeFromCart(pid).then(()=> {
        res.redirect("/cart")
    }).catch(err => console.log(err))
}
exports.getOrders = (req, res, next) => {
    Order.find({"user.userId": req.session.user._id}).then(orders => {
        res.render("shop/orders", {
            pageTitle: "Your Orders - JsNode",
            path: "/orders",
            orders: orders,
            session: req.session
        })
    })
}

exports.postOrders = (req, res, next) => {
    req.user
    .populate("cart.prodId")
    .then(user => {
        let order = new Order({
            items: user.cart,
            user: {
                name: req.user.name,
                userId: req.user
            }
        })
        order.save().then(() => {
            req.user.clearCart().then(() => {
                res.redirect("/orders")
            })
        })
    })
}