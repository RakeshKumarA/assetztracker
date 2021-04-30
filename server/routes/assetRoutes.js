const express = require('express');
const router = express.Router();
const controller = require('../controllers/assetController');
const protect = require('../middleware/authMiddleware');

router.route("/").post(protect, controller.addAsset);
router.route("/viewAsset").get( controller.viewAsset);

module.exports = router;
