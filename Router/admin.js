const express = require('express')
const path = require('path')

const RootDir = require("../utils/RootDir")

const router = express.Router()

router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(RootDir, "Views", "add-product.html"))
})

module.exports = router