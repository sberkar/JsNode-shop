const mongodb = require("mongodb")
const { getDb } = require("../utility/database");
const Product = require("./product");

class User {
    constructor(username, email, cart){
        this.username = username;
        this.email = email;
        this.cart = cart;
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
    }
    static find(id){
        const db = getDb();
        return db.collection('users').find({_id: new mongodb.ObjectId(id)}).next()
    }
    static addTocart(pid, uid){
        let tempCart = { items: [] }
        this.find(uid).then(user => {
            let updatedProduct;
            console.log(user)
            let productInCart = tempCart.items.find(item => item._id.toString() == pid);
            Product.findByID(pid).then(prod => {
                updatedProduct = prod; 
                if(productInCart){
                    updatedProduct.qty = productInCart.qty + 1;
                    console.log(updatedProduct)
                }else{
                    updatedProduct.qty = 1;
                    console.log(updatedProduct)
                }
            }).catch(err => {
                console.log(err)
            })
        })
    }
}

module.exports = User;