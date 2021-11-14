const router = require('express').Router();
const controller = require('../controllers/homeController');
const auth_mv = require('../middlewares/auth_mv');

router.get('/', auth_mv(), controller.index);

module.exports = router;