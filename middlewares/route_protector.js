const Route_Protector = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect("/user/login")
    }
    next()
}

module.exports = Route_Protector