const User = require('../models/userLogin');
const bcrypt = require('bcryptjs');

module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {

            req.flash('error','password and confirmpassword do not match')
            return res.redirect('/users/sign-up');
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await User.findOne({ email: req.body.email })
    
        if (!user) {
            const newUser = await User.create({
                email: req.body.email,
                password: hashedPassword
            })
            req.flash('success','user Created successfully')
            return res.redirect("/");
        } else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.createSession = function (req, res) {
  req.flash('success',"Logged In Succesfully")
    return res.render("home",{ flash: req.flash() })
}

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
      if (err) {
          console.log("ERROR", err)
          return
      }
      req.flash('success',"Logged Out Succesfully")
      return res.redirect("/")
  })
}



  
  