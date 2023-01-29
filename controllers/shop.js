const productModel = require("../models/product");
const cartModel = require("../models/Cart");
const User = require("../models/User");

exports.getHome = (req, res, next) => {
    productModel.fetchAll(products => {
        res.render("shop/index", {
            pageTitle: "JsNode: Shop Without Limit",
            prods: products,
            path: "/",
            user: req.User.email
        })
    })
}

exports.getProduct = (req, res, next) => {
    let productID = req.params.productID;
    productModel.findByID(productID, product => {
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
    cartModel.Cart.fetchAll(p => {
        productModel.fetchAll(prods => {
            let cartData = [];
            prods.forEach(prod => {
                p.products.forEach(pd => {
                    if(prod.id == pd.id){
                        let cartWithProductData = {product: prod, qty: pd.qty}
                        cartData.push(cartWithProductData)
                    }
                })
            })
            let allCartData = {prods: cartData, totalAmount: p.totalAmount}
            res.render("shop/cart", {
                pageTitle: "Your Cart - JsNode",
                path: "/cart",
                allCartData: allCartData
            })
        })
    })

    
}

exports.postCart = (req, res, next) => {
    let productid = req.body.productid;
    let uid = req.User._id.toString();
    User.addTocart(productid, uid)
    res.redirect("/")
}

exports.deleteCartProduct = (req, res, next) => {
    cartModel.Cart.deleteProduct(req.body.productid)
    res.redirect("/cart");
}