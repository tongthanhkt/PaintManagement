const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true}
})
const User = mongoose.model('User',userSchema)
module.exports = User;