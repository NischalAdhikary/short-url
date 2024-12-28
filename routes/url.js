const express=require('express');
const { handleGenerateurl } = require('../controllers/url');
const router=express.Router();
router.post('/',handleGenerateurl)
module.exports=router