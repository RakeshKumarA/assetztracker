const db = require("../db");

// @desc		Add Asset
// @route 	POST /api/assets/
// @access 	Public
const addAsset = async (req, res) => {
  const { onboard, software, hardware, depreciation } = req.body;
  const { userid } = req.user;
  console.log(userid);
  try {
    const results = await db.query(
      "INSERT INTO asset (userid,onboard, software, hardware, depreciation) values ($1, $2, $3, $4, $5) returning *",
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

module.exports = {
  addAsset: addAsset,
  viewAssets: viewAssets,
  searchAsset: searchAsset,
};
