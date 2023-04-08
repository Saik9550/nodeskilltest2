//use npm start

// install express server using npm install express
//package-lock json will be created once we install express and it contains all express dependencies.

//now we need to import express module by require

require("dotenv").config()
const express = require("express")

const passport = require("passport")
const passportLocal = require("./configs/passport-local-strategy")
const GooglePassport=require("./configs/passport-google-oauth")
const session = require("express-session")


// to store session
const MongoStore = require("connect-mongo")(session)
const port = process.env.PORT || 6000

const cookieParser = require("cookie-parser")

//acquire the configurations of mongoose before firing up the server
const db = require("./configs/mongoose")

// create an instance of the express
const app = express()
const flash=require("connect-flash")
const custommidware=require('./configs/middleware')
const Noty = require('noty')


app.use(function(req, res, next) {
    res.noty = function(type, message) {
      new Noty({
        type: type,
        text: message,
        timeout: 3000,
        layout: 'topRight'
      }).show()
    }
    next()
  })
  
app.use(cookieParser())
app.use(express.static("./assets"))

// we are going to set our view engine to ejs (install ejs first)
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(
  session({
    name: "studentList",
   
    secret: "saikrishna",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok")
      }
    ),
  })
)


app.use(express.urlencoded())
app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)
app.use(flash())
// middleware to parse incoming request bodies.
app.use(custommidware.setFlash)
// we are going to use express router
app.use("/", require("./routes"))

app.listen(port, function (err) {
  if (err) {
    console.log("error in listening the server: ", err)
    return
  }
  console.log(`UP and Running on port ${port}`)
})
