const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

const customNameFields = {
    usernameField : 'email',
    passwordField : 'password'
}

passport.use(new LocalStrategy(
    customNameFields, 
    async(username, password, done) => {
        try {
            console.log('hello')
            const user = await User.findOne({email:username});
            if(!user) {
                console.log('user not exit')
                return done(null,false, {message : "User does not exist"})
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                console.log('passnotmatch')
                return done(null,false, {message : "Password does not match"})
            }

            console.log('login successful')
            return done(null, user)
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
});

module.exports = passport;