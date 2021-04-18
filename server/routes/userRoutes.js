const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.route("/login").post(controller.authUser);
router.route("/").post(protect, controller.addUser);
router.route("/view").get(controller.viewUser);
router.route("/remove").post(controller.removeUser);

module.exports = router;
