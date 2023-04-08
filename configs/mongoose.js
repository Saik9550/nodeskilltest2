//first install mongoose by npm install mongoose --save
require("dotenv").config()
const mongoose = require("mongoose")

// connect to MongoDB with the mongoose.connect() method.
mongoose.connect(process.env.MONGO_URL)

//define our database
const db = mongoose.connection

//to know if their is a connection error on connection

db.on("error", function (err) {
  console.log(err.message)
})

//if up and running then print the message on console
db.once("open", function () {
  console.log("Successfully connected to the database")
})

module.exports = db
