const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// user routes
router.get('/sign-up', userController.signupPage)
router.post('/sign-up', userController.signUpValidation ,userController.signup)
router.get('/login', userController.login)
router.post('/login')


module.exports = router;
