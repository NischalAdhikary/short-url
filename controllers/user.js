const { v4: uuidv4}=require('uuid')
const User=require('../models/user')
const {setUser}=require('../services/auth')
async function handleUsersignup(req,res){
    const{name,email,password}=req.body
     await User.create({
        name,
        email,
        password
     })
     return res.render("home")
}
async function handleSignup(req,res){
    const {email,password}=req.body
    const users=await User.findOne({email,password})
    if(!users){
        return res.render('login')
    }
   
    const token=setUser(users)
    res.cookie('token',token)



    return res.redirect("/")
    // return res.json({token})
}
module.exports={
    handleUsersignup,
    handleSignup
}