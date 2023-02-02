const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    items: [
        {
            prodId: {
                type: Object,
                required: true
            },
            qty: {
                type: Number,
                required: true
            } 
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
})

module.exports = mongoose.model("Order", OrdersSchema)


// class Orders{
//     static addOrders(uid){
        
//         return fetchCart(uid, cart => {
//             let orders = {
//                 user: {
//                     _id: uid
//                 }
//             }
//             orders.items = cart;

//             const db = getDb()
//             return db.collection('orders').insertOne(orders)
//         })
        
//     }
//     static getOrders(uid){
//         const db = getDb();
//         return db.collection('orders').find({'user._id': uid}).toArray()
//     }
// }

// module.exports = Orders;