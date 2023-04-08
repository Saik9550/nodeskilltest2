const express = require("express")
const router = express.Router()
const passport = require("passport")

const SignInPage=require('../controllers/userSignIn')


router.get('/',SignInPage.renderSignIn)

router.use('/users',require('./userSignUp'))





module.exports=router;