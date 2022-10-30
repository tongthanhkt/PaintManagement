const User = require('../../models/User')
const bcrypt = require("bcryptjs");

const signUp = async (req, res)=> {
    try {
        console.log(req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body)
        res.json(user);
    } catch (error) {
        res.status(400).json(error)
    }
}
const signIn = async(req, res)=>{
    try {
        console.log(req.body.username)
        const user = await User.findOne({username: req.body.username})
        if(user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result) {
                res.status(200).json({mess: "login success"});
            } else {
                res.status(400).json({error: "login fail"});
            }
        }
        else {
            res.status(400).json({mess :"User doesn't exist "})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}
module.exports = { signIn, signUp}