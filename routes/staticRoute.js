const express=require('express')
const URL=require('../models/url')
const { restrictTo } = require('../middlewares/permit')
const router=express.Router()
router.get('/admin/urls',restrictTo(['admin']),async(req,res)=>{
  

    
    const allUrls=await URL.find({})
    return res.render("home",{
        urls:allUrls
    })


})
router.get('/',restrictTo(['normal','admin']),async(req,res)=>{
  

    
    const allUrls=await URL.find({createdBy:req.user._id})
    return res.render("home",{
        urls:allUrls
    })


})

router.get('/signup',(req,res)=>{
   return  res.render("signup");
})
router.get('/login',(req,res)=>{
    return res.render("login")
})

module.exports=router