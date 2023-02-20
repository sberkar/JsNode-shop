const User = require("../models/User")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const mailTrapClient = require("../utility/mailtrap-sender")

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
                mailTrapClient.send({
                    from: {
                        name: "JsNode",
                        email: "support@colrs.in"
                    },
                    to: [{
                        email: user_email,
                    }],
                    subject: "Sign Up Successful",
                    html: "Explore the <a style='color:light-blue;' href='https://jsnode.com'>JsNode</a> with full potential"
                }).then(result => console.log(result)).catch(err => console.log(err))
            })
        })
    })
}
exports.getResetPassword = (req, res, next) => {
    res.render("shop/Auth/reset-password", {
        pageTitle: "Reset Password - JsNode",
        path: "/user/reset",
        errorMsg: req.flash("error")
    })
}
exports.postResetPassword = (req, res, next) => {
    let user_email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            req.flash("error", "An Error Occurred in Server")
            return res.redirect("/user/reset-password")
        }
        let token = buffer.toString('hex')
        User.findOne({email: user_email}).then(user => {
            if(!user){
                req.flash("error", "No User Found")
                return res.redirect("/user/reset-password")
            }
            user.resetToken = token;
            user.resetTokenExpire = Date.now() + 360000;
            user.save().then(() => {
                mailTrapClient.send({
                    from: {
                        name: "JsNode",
                        email: "support@colrs.in"
                    },
                    to: [{
                        email: user_email,
                    }],
                    subject: "Password Reset",
                    html: `You had requested a password reset. Click here to<a style='color:light-blue;' href='http://localhost:8888/user/reset/${token}'> Reset </a> it`
                }).then(result => {
                    console.log(result)
                    res.redirect("/user/login")
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })
}
exports.getReset = (req, res, next) => {
    let token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpire: {$gt: Date.now()}}).then(user => {
        if(!user) {
            req.flash("error", "Not a Valid Token")
            return res.redirect("/user/reset-password")
        }
        console.log(user)
        res.render("shop/Auth/reset-password-form", {
            pageTitle: "Reset Password - JsNode",
            path: "/user/prf",
            errorMsg: req.flash("error"),
            userId: user._id.toString()
        })
    })
}

exports.postReset = (req, res, next) => {
    let token = req.body.token;
    let userId = req.body.userId;
    let password = req.body.password;
    User.findOne({_id: userId}).then(user => {
        if(!user){
            req.flash("error", "An error occurred in server no user")
            return res.redirect("/user/reset/" + token)
        }
        bcrypt.hash(password, 12).then(hash_pass => {
            user.password = hash_pass;
            user.resetToken = null;
            user.resetTokenExpire = null;
            user.save().then(() => {
                return res.redirect("/user/login")
            }).catch(err => {
                req.flash("error", "An Error occurred in server save function")
                return res.redirect("/user/reset/" + token)
            })
        }).catch(err => {
            req.flash("error", "An Error occurred in server hash")
            return res.redirect("/user/reset/" + token)
        })
    })
}