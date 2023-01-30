const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const shopRoute = require("./routes/shop")
const adminRoute = require("./routes/admin")

const User = require("./models/User")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, n) => {
    User.findById("63d6082b68785575d94e1a4e").then(user => {
        req.User = user;
        n() 
    }).catch(err => {
        console.log(err)
        n()
    })
})

app.use("/", shopRoute)
app.use("/admin", adminRoute)
// kd
mongoose.connect("mongodb+srv://nodejs:nodejspass@cluster0.br8knbq.mongodb.net/shop?retryWrites=true&w=majority").then(result => {
    User.findOne().then(user => {
        if(!user){
            let newUser = new User({
                name: "John Doe",
                email: "john@doe.com",
                cart: []
            })
            newUser.save()
        }
    })
    app.listen(8888)
}).catch(err => {
    console.log(err)
})