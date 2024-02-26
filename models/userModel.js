const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type:String, 
        required : true,
        maxLength : 30
    },
    email : {
        type:String, 
        required : true
    },
    password : {
        type:String, 
        required : true,
    },
    member : {
        type:Boolean, 
        required : true
    },
    admin : {
        type:Boolean, 
        require:true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User