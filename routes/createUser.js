const express = require("express");
const router = express.Router();
const passport = require("passport");
const createUserController = require("../controllers/createUser");

const resetController=require("../controllers/resetController")

router.post('/create', createUserController.create);

router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/" }),
    createUserController.createSession
  )

  router.get("/sign-out", createUserController.destroySession)


  router.get("/reset-password",function(req,res){
    return res.render("resetpage")
  })

  router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),createUserController.createSession)

  router.post("/re-password",resetController.resetPassword)
module.exports = router;
