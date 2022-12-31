const jwt = require('jsonwebtoken')
const verifyUserToken = (req, res, next)=>{
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);   // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; // user_id & user_type_id
        console.log(req.user);
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}
const IsUser = (req, res, next) =>{
    if(req.user.user_type_id === '1') {
        next();
    }
   else return res.status(401).send("Unauthorized Is User !");
}
const IsAdmin = (req, res, next) =>{
    if(req.user.user_type_id === 0) {
        next();
    }
    return res.status(401).send("Unauthorized Is Admin !");
}
module.exports = {IsAdmin, IsUser, verifyUserToken}
