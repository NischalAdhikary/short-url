const {getUser}=require('../services/auth')
function checkForAuthentication(req,res,next){
    const tookenCookie=req.cookies?.token;
    req.user=null;
    if(!tookenCookie) return next();

        const token=tookenCookie
        const user=getUser(token)
        req.user=user;
        return next();

}
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login")
            if(!roles.includes(req.user.role))
                return res.end('Unauthorized');
            next();

    }
}
// async function isRestrictedtoLogin(req,res,next){
//     // const userSession=req.cookies?.uid
//     const userSession=req.headers["authorization"]
//     if(!userSession) return res.render("login")
//         const token=userSession.split('Bearer ')[1]

//         const user=getUser(token);
//     if(!user) return res.render("login")
//         req.user=user
// next()
// }
// async function checkauth(req,res,next) {
//     // const userSession=req.cookies?.uid
//     const userSession=req.headers["authorization"]
//     const token=userSession.split('Bearer ')[1]

//     const user=getUser(token);
//     req.user=user 
//     next()
    
// }
module.exports={
    checkForAuthentication,restrictTo
}