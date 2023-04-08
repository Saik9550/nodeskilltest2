const express = require("express")
const router = express.Router()
const passport = require("passport")


const userSignUpController=require('../controllers/userSignUp')

router.get('/sign-up',userSignUpController.signUp)



router.use('',require('./createUser'))





module.exports=router;