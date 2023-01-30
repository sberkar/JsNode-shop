const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)
// const mongodb = require("mongodb");
// const getDb = require("../utility/database").getDb;
// const User = require("./User")

// class Product{
//     constructor(title, price, image, desc){
//         this.title= title
//         this.price = price
//         this.image = image
//         this.desc = desc
//     }
//     save(){
//         const db = getDb()
//         return db.collection('products').insertOne(this).then(res => console.log(res)).catch(err => console.log(err))
//     }
//     static fetchAll(cb){
//         const db = getDb();
//         return db.collection('products').find().toArray().then((products) => {
//             cb(products)
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     static findByID(id) {
//         const db = getDb()
//         return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next();
//     }
//     static editProduct(body) {
//         let objectForUpdate = {$set: {
//             title: body.title,
//             price: body.price,
//             image: body.image,
//             desc: body.desc,
//         },}
//         const db = getDb();
//         return db.collection('products').updateOne({_id: new mongodb.ObjectId(body.productid)},objectForUpdate)
//     }
//     static deleteProduct(pid, uid){
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(pid)}).then(() => {
//             db.collection('users').findOne({_id: new mongodb.ObjectId(uid)}).then(user => {
//                 console.log(user) 
//                 let cart = user.cart;
//                 let pic = cart.findIndex(i => i.prodId == pid)
//                 if(!(pic < 0)){
//                     let updatedCart = cart.filter(i => i.prodId != pid)
//                     db.collection('users').updateOne({_id: new mongodb.ObjectId(uid)}, {$set: {
//                         cart: updatedCart
//                     }})
//                 }
//             })
//         })
//     }
// }
// module.exports = Product;