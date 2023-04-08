const mongoose = require("mongoose")

// Define a user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// Create a user model
const User = mongoose.model("User", userSchema)

module.exports = User
