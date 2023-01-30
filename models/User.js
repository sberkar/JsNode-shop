const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        type: [{
            prodId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        required: true
    }
})

UserSchema.methods.AddToCart = function(product){
    let productInCartIndex = this.cart.findIndex(pic => pic.prodId == product._id)

    let cart = [...this.cart]
    let newqty;
    
    if(productInCartIndex >= 0){

    }
}

module.exports = mongoose.model("User", UserSchema)

// const Product = require("./Product");

// class User {
//     constructor(username, email){
//         this.username = username;
//         this.email = email;
//         this.cart = [];
//     }
//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this)
//     }
//     static find(id){
//         const db = getDb();
//         return db.collection('users').find({_id: new mongodb.ObjectId(id)}).next()
//     }
//     static addTocart(pid, uid){
//         this.find(uid).then(user => {
//             let updatedProduct;
//             let items = [...user.cart]
//             let productInCart;

//             productInCart = items.find(item => item.prodId.toString() == pid);
//             Product.findByID(pid).then(prod => {
//                 updatedProduct = {
//                     prodId: prod._id.toString()
//                 }
//                 if(productInCart){
//                     updatedProduct.qty = productInCart.qty + 1;
                    
//                     let productInCartIndex = items.findIndex(item => item.prodId == pid)                    
//                     items[productInCartIndex] = updatedProduct;
//                     const db = getDb();
//                     return db.collection('users').updateOne({_id: mongodb.ObjectId(uid)}, {$set: {
//                         cart: items
//                     }})
//                 }else{
//                     updatedProduct.qty = 1;
//                     items = [...user.cart, updatedProduct]
//                     const db = getDb();
//                     return db.collection('users').updateOne({_id: mongodb.ObjectId(uid)}, {$set: {
//                         cart: items
//                     }})
//                 }
//             }).catch(err => {
//                 console.log(err)
//             })
//         })
//     }
//     static fetchCart(uid, cb){
//         const db = getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(uid)}).then(user => {
//             let productIds = user.cart.map(item => {
//                 return mongodb.ObjectId(item.prodId)
//             })
//             let allProductsInCart = db.collection('products').find({_id: {$in: productIds}}).toArray();
//             allProductsInCart.then(products => {
//                 let qtys = user.cart.map(item => {
//                     return item.qty
//                 })
//                 let pwpArr = []
//                 for(let i = 0; i < products.length; i++){
//                     let pwp = {...products[i], qty: qtys[i]}
//                     pwpArr.push(pwp)
//                 }
//                 cb(pwpArr)
//             }).catch(err => console.log(err))
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     static fetchCartRaw(uid){
//         const db = getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(uid)})
//     }
//     static deleteProductFromCart(uid, pid){
//         const db = getDb();
//         db.collection('users').findOne({_id: new mongodb.ObjectId(uid)}).then(user => {
//             let cartItems = user.cart;
//             let itemRemovedCart = cartItems.filter(cartItem => cartItem.prodId != pid);

//             db.collection('users').updateOne({_id: new mongodb.ObjectId(uid)}, {$set: {
//                 cart: itemRemovedCart
//             }})
//         })
//     }
// }

// module.exports = User;