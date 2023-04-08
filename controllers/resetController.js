const bcrypt = require('bcrypt');
const User = require('../models/userLogin');

console.log('entred');
module.exports.resetPassword = function(req, res) {
 
  const userId = req.user._id;
  const newPassword = req.body.newPassword;

  // hash the new password
  bcrypt.hash(newPassword, 10, function(err, hash) {
    if (err) {
      console.log(err);
      return res.redirect('/reset-password');
    }

    // update the user's password in the database
    User.findByIdAndUpdate(userId, { password: hash })
      .then((user) => {
        // redirect the user to their profile page or some other page
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/reset-password');
      });
  });
};
