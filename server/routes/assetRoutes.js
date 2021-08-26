const express = require("express");
const router = express.Router();
const controller = require("../controllers/assetController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, controller.addAsset);
router.route("/bulkassets").post(protect, controller.addBulkAsset);
router.route("/viewassets").get(protect, controller.viewAssets);
router.route("/searchAsset").post(protect, controller.searchAsset);
router.route("/downlAsset").post(protect, controller.downlAsset);
router.route("/assettype").get(protect, controller.getAssetType);
router.route("/assetaudit/:id").get(protect, controller.getAssetAudit);

module.exports = router;
