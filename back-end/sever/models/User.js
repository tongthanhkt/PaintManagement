const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    user_type_id:{type: String, require: true},

})
const User = mongoose.model('User',userSchema)
module.exports = User;