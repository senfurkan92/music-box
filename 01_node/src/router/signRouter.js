const router = require('express').Router();
const controller = require('../controllers/userController');
const {signUpValidation, signInValidation}= require('../middlewares/validation_mv');
const auth_mv = require("../middlewares/auth_mv")

router.post('/signUp', signUpValidation(), controller.signUpAction);
router.post('/signIn', signInValidation(), controller.signInAction);
router.get('/autoSignIn', auth_mv(), controller.autoSignInAction);

module.exports = router;