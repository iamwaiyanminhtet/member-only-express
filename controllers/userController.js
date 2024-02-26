const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')

const User = require('../models/userModel');
const passport = require('./loginStrategy');
const { ObjectId } = require("mongodb");

const signupPage = (req,res) => {
    res.render('sign-up', {error : {}})
}

const signUpValidation = [
    body('username').trim().isString().escape(),
    body('email').trim().isEmail().escape(),
    body('email').custom(async value => {
        const user = await User.findOne({email:value});
        if (user) {
          throw new Error('E-mail already in use');
        }
    }),
    body('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) 
            throw new Error('Passwords do not match')
        else 
            return value === req.body.password;
    }),
]

const signup = asyncHandler(async (req,res) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err) console.log(err);
            await User.create({
                username : req.body.username,
                email : req.body.email,
                password : hashedPassword,
                username : req.body.username,
                member : false,
                admin : false
            });
            res.redirect('/')
          });
    }else {
        res.render('sign-up', {error : error.errors[0]})
    }
})

const loginPage = (req,res) => {
    res.render('login')
} 

const passportAuth = passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login'
})

const logout = (req, res) => {
    req.logOut((err) => {
      if(err) console.log(err)
      res.redirect('/')
    })
};

const joinMember = asyncHandler(async (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        await User.findByIdAndUpdate(
            new ObjectId(req.params.id), 
            { $set : {member : true}}
        )
        res.redirect('/')
    }
})

const becomeAdmin =asyncHandler(async  (req,res) => {
    if(req.body.admin === "admin") {
        await User.findByIdAndUpdate(
            new ObjectId(req.params.id), 
            { $set : {admin : true}}
        )
        res.redirect('/')
    } else {
        res.redirect('/')
    }
});

module.exports = {
    signupPage,
    signup,
    signUpValidation,
    loginPage,
    passportAuth,
    logout,
    joinMember,
    becomeAdmin
}