const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.getAccount = (req, res, next) => {
    if(req.session){
        return res.render("shop/Auth/account", {
            pageTitle: "Account - JsNode",
            path: "/user/account",
            user: req.session.user,
            session: req.session
        })
    }else{
        return res.redirect("/user/login")
    }
}

exports.getLogin = (req, res, next) => {

    console.log(req.session.isLoggedIn)
    res.render("shop/Auth/login",{
        pageTitle: "Login - JsNode",
        path: "/login",
        session: req.session,
        errorMsg: req.flash("error")
    })
}

exports.postLogin = (req, res, next) => {
    let user_email = req.body.email;
    let user_password = req.body.password;

    User.findOne({email: user_email}).then(user => {
        if(!user){
            req.flash("error", "Invalid Credentials")
            return res.redirect("/user/login")
        }
        bcrypt.compare(user_password, user.password).then(ans => {
            if(ans){
                req.session.isLoggedIn = true;
                req.session.user = user
                req.session.save(err => {
                    console.log(err)
                    return res.redirect("/")
                })
            }else{
                req.flash("error", "Invalid Credentials")
                return res.redirect("/user/login")
            }
        })
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        req.flash("success", "Logged Out Successfully")
        res.redirect("/user/login")
    })
}

exports.getSignUp = (req, res, next) => {
    res.render("shop/Auth/signup", {
        pageTitle: "Sign Up - JsNode",
        path: "/user/signup",
        session: req.session,
        errorMsg: req.flash("error")
    })
}

exports.postSignUp = (req, res, next) => {
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_password = req.body.password;

    User.findOne({email: user_email}).then(user => {
        if(user) {
            req.flash("error", "Email Already Exists")
            return res.redirect("/user/signup")
        }
        bcrypt.hash(user_password, 10).then(hashpass => {
            let user = new User({name: user_name, email: user_email, password: hashpass, cart: []})
            user.save().then(() => {
                res.redirect("/user/login")
            })
        })
    })
}