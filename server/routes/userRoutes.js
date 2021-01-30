const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.route('/login').post(controller.authUser);
router.route('/').post(controller.registerUser);

module.exports = router;
