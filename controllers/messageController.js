const asyncHandler = require('express-async-handler')

const Message = require('../models/messageModel');
const { ObjectId } = require('mongodb');

const createMessagePage = (req, res) => {
    if(req.isAuthenticated()) {
        res.render('create-message');
    }
    res.redirect('/')
}

const createMessage = asyncHandler(async(req, res) => {
    await Message.create({
        title : req.body.title,
        message : req.body.message,
        userId : req.user._id
    })
    res.redirect('/')
})

const deleteMessage = asyncHandler(async(req,res) => {
    await Message.findByIdAndDelete(new ObjectId(req.params.id));
    res.redirect('/')
})
module.exports = {
    createMessagePage,
    createMessage,
    deleteMessage
}