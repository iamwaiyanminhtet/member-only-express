const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const main = require('./models/db-connect')
const indexRouter = require('./routes/index');

const app = express();

require('dotenv').config()
main().then(() => console.log('dbconnect')).catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 // 1hour
  },
  store: new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
  }),
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
});

module.exports = app;
