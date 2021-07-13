const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, controller.addEmployee);
router.route("/view").get(protect, controller.viewEmployee);
router.route("/search").post(protect, controller.searchEmployee);
router.route("/downemp").post(protect, controller.downlEmp);

module.exports = router;
