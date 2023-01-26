const path = require("path")
const fs = require("fs")

const Product = require("./product")

let p = path.join(path.dirname(require.main.filename), "data", "cart.json")

function TotalPrice(products) {
    let tp = 0;
    products.forEach(product => {
        tp = tp + (product.price * product.qty);
    })
    return tp;
}

function AddToFile(data) {
    let fileContent = JSON.stringify(data)
    fs.writeFile(p, fileContent, (err) => {
        console.log(err)
    }) 
}

exports.Cart = class Cart {
    static Add(id, productPrice){
        let cart = {products:[], totalAmount:0}

        fs.readFile(p, (err, data) => {
            cart = JSON.parse(data)
            
            if(err){
                console.log(err)
            }            

            let findProduct = cart.products.find(product => product.id == id)
            let findProductIndex = cart.products.findIndex(product => product.id == id)

            if(findProduct){
                let updateProduct = {...findProduct}
                updateProduct.qty = findProduct.qty + 1;
                cart.products[findProductIndex] = updateProduct;
                cart.totalAmount = TotalPrice(cart.products)
                AddToFile(cart);
            }else{
                let newProduct = {id: id, price: productPrice, qty:1}
                cart.products.push(newProduct)
                cart.totalAmount = TotalPrice(cart.products);
                AddToFile(cart);
            }
        })
    }
    static fetchAll(cb){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return cb([])
            }
            cb(JSON.parse(fileContent))
        })
    }
    static getProductById(id, cb){
        fs.readFile(p, (err, data) => {
            if(err) {
                return cb({error: "server"})
            }
            let cart = JSON.parse(data)
            let getProductFromId = cart.products.find(product => product.id == id)
            if(getProductFromId){
                return cb(getProductFromId)
            } else {
                return cb({error: "no such product"})
            }
        })
    }

    static editProduct(id, price){
        let cart = {products: [], totalAmount: 0}
        fs.readFile(p, (err, data) => {
            if(err){
                return;
            }
            cart = JSON.parse(data)
            let productForEdit = cart.products.find(product => product.id == id)
            let productForEditIndex = cart.products.findIndex(product => product.id == id)
            if(productForEdit){
                let updatedProduct = {
                    id: productForEdit.id,
                    qty: productForEdit.qty,
                    price: parseFloat(price)
                }
                let newTotalAmount = cart.totalAmount + (updatedProduct.qty * updatedProduct.price) - (productForEdit.qty * productForEdit.price)
                
                cart.products[productForEditIndex] = updatedProduct;
                cart.totalAmount = newTotalAmount;
                AddToFile(cart)
                console.log(cart)
            }
        })
    }
    
    static deleteProduct(id) {
        let cart = {products: [], totalAmount: 0}
        fs.readFile(p, (err, data) => {
            if(err){
                return;
            }
            cart = JSON.parse(data)
            let getProduct = cart.products.find(product => product.id == id)
            if(getProduct){
                let newCartData = cart.products.filter(product => product.id != id);
                let newTotalAmount = cart.totalAmount - (getProduct.qty * getProduct.price);
                cart.products = newCartData;
                cart.totalAmount = newTotalAmount;
                AddToFile(cart)
            }
        })
    }
}