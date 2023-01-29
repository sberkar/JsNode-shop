const express = require("express")
const bodyParser = require("body-parser")

const shopRoute = require("./routes/shop")
const adminRoute = require("./routes/admin")
const database = require("./utility/database")
const User = require("./models/User")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, n) => {
    User.find("63d38c23f965c38bd3c02efc").then(user => {
        req.User = user;
        n() 
    }).catch(err => {
        console.log(err)
        n()
    })
})

app.use("/", shopRoute)
app.use("/admin", adminRoute)

database.connectToDB(() => {
    app.listen(8888)
})