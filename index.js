const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const path=require('path')
const URL=require('./models/url')
const staticRoute=require('./routes/staticRoute')
const userRoute =require('./routes/user')
const {connectmongodb}=require('./connection')
const urlRoute=require('./routes/url')
const {checkForAuthentication,restrictTo}=require('./middlewares/permit')
const PORT=8001
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
connectmongodb("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("mongodb connected");
    
}).catch((err)=>{
    console.log(err);
    
})
app.set("view engine","ejs")
app.set('views',path.resolve("./views"))
app.use(checkForAuthentication)

// app.get('/test',(req,res)=>{
    

//  return   res.render('home')
// })
app.use('/',staticRoute)
app.use('/user',userRoute)
app.use('/url',restrictTo(['normal']),urlRoute)


app.get('/:id',async(req,res)=>{
    const shortId=req.params.id
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
       
    })
    console.log(entry);
    
    if (!entry) {
        return res.status(404).send('URL not found');
      }
    
    res.redirect(entry.redirectURL)

})


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
    
})
