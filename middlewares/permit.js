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

module.exports={
    checkForAuthentication,restrictTo
}