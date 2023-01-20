const express = require("express");
const path = require("path")

const app = express()

app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "just.html"))
})
app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "just.html"))
})

app.listen(8888)