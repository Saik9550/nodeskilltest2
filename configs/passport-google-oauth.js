require("dotenv").config()

const passport=require("passport")

const googleStrategy=require("passport-google-oauth").OAuth2Strategy;

const User=require("../models/userLogin")

const crypto=require("crypto");

passport.use(new googleStrategy({
    clientID:process.env.GoogleOAuthClientId,
    clientSecret: process.env.GoogleOAuthClientSecret,
    callbackURL:process.env.callBack
},

function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).then(function(user){
        if(user){
            return done(null,user)
        }
        else{
            User.create({
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then(function(newUser){
                return done(null,newUser)
            }).catch(function(err){
                console.log("error in creating user",err)
                return done(err,null)
            })
        }
    }).catch(function(err){
        console.log("error in google strategy :",err)
        return done(err,null)
    })
}


))

module.exports=passport;
