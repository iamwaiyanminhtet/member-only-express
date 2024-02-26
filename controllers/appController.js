const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')

const home = asyncHandler(async(req, res, next) => {
    const messages = await Message.find().populate('userId').exec();
    res.render('index', {messages});
})

const locals = (req, res, next) => {
    res.locals.user = req.user;
    next();
}

module.exports = {
    home,
    locals
}