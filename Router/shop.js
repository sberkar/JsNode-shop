const express = require("express")
const path = require("path")
const RootDir = require("../utils/RootDir")
const router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(RootDir, "Views", "shop.html"))
})

module.exports = router;