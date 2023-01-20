const express = require("express");
const bodyParser = require("body-parser")
const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.set("view engine", "ejs")
app.set("views", "Assign")

const users = [];

app.get("/", (req, res) => {
    res.render("Assignment-template/views/home", {
        pageTitle: "User Registration Centre",
        path: "/"
    })
})
app.get("/users", (req, res) => {
    res.render("Assignment-template/views/users", {
        path: "/users",
        usersData: users,
        pageTitle: "Users Lists"
    })
})

app.post("/user", (req, res) => {
    users.push({
        name: req.body.n,
        username: req.body.un
    })
    console.log(users)
    res.redirect("/users")
})

app.use((req, res) => {
    res.status(404).render("Assignment-template/views/404", {
        pageTitle: "404 - not found",
        path: ''
    })
})

app.listen(8888, () => console.log("running"))