module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/")
    }
  
    return res.render("userSignUp", {
      title: "Sign Up",
    })
  }