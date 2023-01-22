const path = require("path");
const fs = require("fs");

class Product{
    constructor(title, price, image, desc){
        this.title= title
        this.price = price
        this.image = image
        this.desc = desc
    }
    save(){
        let p = path.join(path.dirname(require.main.filename), "data", "products.json")
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
        let p = path.join(path.dirname(require.main.filename), "data", "products.json")
        fs.readFile(p, (err, data) => {
            if(err){
                cb([])
            }
            cb(JSON.parse(data))
        })
    }
}


module.exports = Product;