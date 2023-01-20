const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const adminRouter = require('./Router/admin')
const shopRouter = require('./Router/shop')
const RootDir = require('./utils/RootDir')

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use("/admin", adminRouter)
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(RootDir, "Views", "not-found.html"))
})

app.listen(3000)