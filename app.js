const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const csrf = require("csurf")
const flash = require("connect-flash")

const csrfProtection = csrf()

const store = new MongoDBStore({
    uri: "mongodb+srv://nodejs:nodejspass@cluster0.br8knbq.mongodb.net/shop",
    collection: 'sessions'
})

const shopRoute = require("./routes/shop")
const appUserRoute = require("./routes/Auth")
const adminRoute = require("./routes/admin")

const User = require("./models/User")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("public"));
app.use(session({secret: "my secret", resave: false, saveUninitialized: false,store: store}))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    if(!req.session.user){
        return next()
    }
    User.findById(req.session.user._id.toString()).then(user => {
        if(!user) return res.redirect("/user/login")
        req.user = user;
        next()
    }).catch(err => {
        console.log(err)
        return res.redirect("/user/login")
    })
})
app.use(flash())
app.use(csrfProtection)

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use("/", shopRoute)
app.use("/user", appUserRoute)
app.use("/admin", adminRoute)
// kd
mongoose.connect("mongodb+srv://nodejs:nodejspass@cluster0.br8knbq.mongodb.net/shop?retryWrites=true&w=majority").then(result => {
    app.listen(8888)
}).catch(err => {
    console.log(err)
})