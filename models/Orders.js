
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