const User = require('../models/userLogin');
const bcrypt = require('bcryptjs');

// Function to create a new user
module.exports.create = async function (req, res) {
    try {
        // Check if the password and confirm password fields match
        if (req.body.password != req.body.confirm_password) {

            req.flash('error','password and confirmpassword do not match')
            return res.redirect('/users/sign-up');
        }
    
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // Check if a user with the same email already exists in the database
        const user = await User.findOne({ email: req.body.email })
    
        if (!user) {
            // If no user exists, create a new user with the provided email and hashed password
            const newUser = await User.create({
                email: req.body.email,
                password: hashedPassword
            })
            req.flash('success','user Created successfully')
            return res.redirect("/");
        } else {
            // If a user with the same email already exists, redirect back to the signup page
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// Function to create a session after user logs in
module.exports.createSession = function (req, res) {
  req.flash('success',"Logged In Succesfully")
    return res.render("home",{ flash: req.flash() })
}

// Function to destroy a session after user logs out
module.exports.destroySession = function (req, res) {
  // Call the logout method provided by Passport.js to remove the user's session
  req.logout(function (err) {
      if (err) {
          console.log("ERROR", err)
          return
      }
      req.flash('success',"Logged Out Succesfully")
      return res.redirect("/")
  })
}
