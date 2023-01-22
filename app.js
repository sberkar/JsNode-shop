const express = require("express")
const bodyParser = require("body-parser")

const shopRoute = require("./routes/shop")
const adminRoute = require("./routes/admin")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use("/", shopRoute)
app.use("/admin", adminRoute)

app.listen(8888)