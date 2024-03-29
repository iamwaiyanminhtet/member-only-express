const mongoose = require('mongoose');

const {Schema} = mongoose;

const MessageSchema = Schema({
    title : {
        type:String, 
        required : true,
        maxLength : 50
    },
    message : {
        type:String, 
        required : true,
        maxLength : 200
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message