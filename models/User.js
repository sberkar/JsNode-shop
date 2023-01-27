const mongodb = require("mongodb")
const { getDb } = require("../utility/database");

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
    static addTocart(product){
        
    }
}

module.exports = User;