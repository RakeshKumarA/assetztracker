const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, controller.dashboardLanding);

module.exports = router;
