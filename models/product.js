const mongodb = require("mongodb")
const getDb = require("../utility/database").getDb;

class Product{
    constructor(title, price, image, desc){
        this.title= title
        this.price = price
        this.image = image
        this.desc = desc
    }
    save(){
        const db = getDb()
        return db.collection('products').insertOne(this).then(res => console.log(res)).catch(err => console.log(err))
    }
    static fetchAll(cb){
        const db = getDb();
        return db.collection('products').find().toArray().then((products) => {
            cb(products)
        }).catch(err => {
            console.log(err)
        })
    }
    static findByID(id) {
        const db = getDb()
        return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next();
    }
    static editProduct(body) {
        let objectForUpdate = {$set: {
            title: body.title,
            price: body.price,
            image: body.image,
            desc: body.desc,
        },}
        const db = getDb();
        return db.collection('products').updateOne({_id: new mongodb.ObjectId(body.productid)},objectForUpdate)
    }
    static deleteProduct(id){
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
    }
}
module.exports = Product;