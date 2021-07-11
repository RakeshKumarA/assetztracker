const db = require("../db");
const excel = require("exceljs");
var format = require("pg-format");

// @desc		Add Asset
// @route 	POST /api/assets/
// @access 	Public
const addAsset = async (req, res) => {
  const { onboard, software, hardware, depreciation } = req.body;
  const { userid } = req.user;
  try {
    const results = await db.query(
      "INSERT INTO asset (userid, onboard, software, hardware, depreciation) values ($1, $2, $3, $4, $5) returning *",
      [
        userid,
        onboard,
        JSON.stringify(software),
        JSON.stringify(hardware),
        depreciation,
      ]
    );
    res.status(201).json({
      status: 201,
      userid: results.rows[0].userid,
      onboard: results.rows[0].onboard,
      software: results.rows[0].software,
      hardware: results.rows[0].hardware,
      depreciation: results.rows[0].depreciation,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Add Bulk Asset
// @route 	POST /api/bulkassets/
// @access 	Public
const addBulkAsset = async (req, res) => {
  const { assets } = req.body;

  try {
    const results = await db.query(
      format(
        "INSERT INTO asset (onboard, software, hardware, depreciation, userid) VALUES %L returning *",
        assets
      ),
      [],
      (err) => {
        res.json({ status: 500, message: err.message });
      }
    );

    res.status(201).json({
      status: 201,
      assets: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		View Asset
// @route 	GET /api/assets/viewassets
// @access 	Public
const viewAssets = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT a2.*,u2.name FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid)"
    );
    res.status(200).json({
      status: 200,
      assets: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Search Asset
// @route 	POST /api/assets/searchAsset
// @access 	Public
const searchAsset = async (req, res) => {
  const { assetId } = req.body;

  try {
    const searchedAsset = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.onboard -> 'assetId' ->> 'value' =$1",
      [assetId]
    );

    res.json({
      status: 200,
      noOfAssets: searchedAsset.rowCount,
      asset: searchedAsset.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		Download Assets
// @route 	POST /api/assets/downlAsset
// @access 	Public

const downlAsset = async (req, res) => {
  const { id } = req.body;

  try {
    const downloadedAsset = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.id = ANY($1::int[])",
      [id]
    );
    const finalDownloadedAsset = downloadedAsset.rows.map((asset) => ({
      assetId: asset.onboard.assetId.value,
      assetName: asset.onboard.assetName.value,
      assetStatus: asset.onboard.assetStatus.value,
      assetType: asset.onboard.assetType.value,
      cost: asset.onboard.cost.value,
      invoiceNumber: asset.onboard.invoiceNumber.value,
      onboardDate: asset.onboard.onboardDate.value,
      productSerial: asset.onboard.productSerial.value,
      purchaseDate: asset.onboard.purchaseDate.value,
      purchaseOrder: asset.onboard.purchaseOrder.value,
      vendor: asset.onboard.vendor.value,
      warranty: asset.onboard.warranty.value,
      warrantyExp: asset.onboard.warrantyExp.value,
      name: asset.name,
    }));

    res.json({
      status: 200,
      assets: finalDownloadedAsset,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addAsset: addAsset,
  addBulkAsset: addBulkAsset,
  viewAssets: viewAssets,
  searchAsset: searchAsset,
  downlAsset: downlAsset,
};
