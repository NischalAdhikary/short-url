const express=require('express')
const router=express.Router()
const {handleUsersignup,handleSignup}=require('../controllers/user')
 router.post('/',handleUsersignup)
 router.post('/login',handleSignup)
module.exports=router;