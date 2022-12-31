const User = require('../../models/User')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const signUp = async (req, res)=> {
   const salt = await bcrypt.genSalt(10);
   const hasPassword = await bcrypt.hash(req.body.password, salt);
   let user = new User({
    email: req.body.email,
    name: req.body.name,
    password: hasPassword,
    user_type_id: req.body.user_type_id
   })

   user.save((err, registerUser)=>{
    if(err) {
        console.log(err);
    } else {
        let payload = { id: registerUser._id, user_type_id: req.body }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.status(200).send({token})
    }
   })
}
const signIn = async(req, res)=>{
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(401).send("Mobile/Email or Password is wrong");

                // Create and assign token
                let payload = { id: user._id, user_type_id: user.user_type_id };
                const token = jwt.sign(payload, process.env.TOKEN_SECRET);

                res.status(200).header("auth-token", token).send({ "token": token });
            }
            else {
                res.status(401).send('Invalid mobile')
            }

        }
    })
}
module.exports = { signIn, signUp}