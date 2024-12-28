const shortid = require('shortid');  // Import shortid
const URL = require('../models/url');  // Your URL model

async function handleGenerateurl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Provide the url" });
    }

    // Generate a unique short ID for the provided URL
    const uid = shortid.generate();  // Use shortid to generate a unique ID
    console.log(uid);

    // Save the URL and its short ID in your database
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