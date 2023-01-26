const path = require("path");
const fs = require("fs");
const { Cart } = require("./Cart");

let p = path.join(path.dirname(require.main.filename), "data", "products.json")

class Product{
    constructor(title, price, image, desc){
        this.title= title
        this.price = price
        this.image = image
        this.desc = desc
    }
    save(){
        this.id = Math.random().toString()
        let products = [];
        fs.readFile(p, (err, data) => {
            if(!err) {
                products = JSON.parse(data);
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })

    }
    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if(err){
                cb([])
            }
            cb(JSON.parse(data))
        })
    }
    static findByID(id, cb) {
        let p = path.join(path.dirname(require.main.filename), "data", "products.json")
        fs.readFile(p, (err, data) => {
            if(err){
                return cb({})
            }
            let products = JSON.parse(data)
            let product = products.find(p => p.id == id)
            if(!product) {
                return cb({})
            }
            cb(product)
        })
    }
    static editProduct(edittedBody) {
        fs.readFile(p, (err, data) => {
            let products = [];
            if(err){
                console.log(err)
            }
            products = JSON.parse(data)
            let findProduct = products.find(product => product.id == edittedBody.productid);
            let findProductIndex = products.findIndex(product => product.id == edittedBody.productid);
            if(findProduct){
                let edittedProduct = {
                    title: edittedBody.title,
                    price: edittedBody.price,
                    image: edittedBody.image,
                    desc: edittedBody.desc,
                    id: edittedBody.productid
                }
                products[findProductIndex] = edittedProduct;
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if(!err){
                        Cart.editProduct(edittedBody.productid, edittedBody.price)
                    }
                })
            }else{
                return {
                    error: [{
                        msg: "no product found"
                    }]
                }
            }
        }) 
    }

    static deleteProduct(id){
        let products = [];
        fs.readFile(p, (err, data) => {
            if(err) return {
                err: err.message
            }
            products = JSON.parse(data);
            let productDeletedArray = products.filter(product => product.id != id)
            fs.writeFile(p, JSON.stringify(productDeletedArray), (err) => {
                if(!err){
                    Cart.getProductById(id, product => {
                        if(product.error != null){
                            Cart.deleteProduct(id);
                        }
                    })
                }
            })
        })
    }
}


module.exports = Product;