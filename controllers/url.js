const shortid = require('shortid');  
const URL = require('../models/url'); 

async function handleGenerateurl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Provide the url" });
    }

  
    const uid = shortid.generate();  
    console.log(uid);

    
    await URL.create({
        shortId: uid,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    });
    return res.render("home",{
        id:uid,
    })

  
}

module.exports = {
    handleGenerateurl,
};