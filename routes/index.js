const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const appController = require('../controllers/appController')

/* GET home page. */
router.use(appController.locals);
router.get('/', appController.home);

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

// user routes
router.get('/sign-up', userController.signupPage)
router.post('/sign-up', userController.signUpValidation ,userController.signup)
router.get('/login', userController.loginPage)
router.post('/login', userController.passportAuth);
router.get('/log-out', userController.logout)
router.get('/join-member/:id', userController.joinMember)
router.post('/become-admin/:id', userController.becomeAdmin)

module.exports = router;
