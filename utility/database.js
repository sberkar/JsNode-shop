const mongodb = require("mongodb")
let mongodbClient = mongodb.MongoClient;

let _db;

function connectToDB(cb){
    mongodbClient.connect("mongodb+srv://nodejs:nodejspass@cluster0.br8knbq.mongodb.net/shop?retryWrites=true&w=majority").then(result => {
        console.log("connected")
        _db = result.db();
        cb()
    }).catch(err => {
        console.log(err)
    })
}

function getDb(){
    if(_db){
        return _db
    }
    throw "no database found"
}

module.exports = {connectToDB, getDb};