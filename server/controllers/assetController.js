const db = require('../db');

// @desc		Add Asset
// @route 	POST /api/assets/
// @access 	Public
const addAsset = async (req, res) => {
  const { userid, onboard, software, hardware, depreciation } = req.body;
  try {
    const results = await db.query(
      'INSERT INTO asset (userid, onboard, software, hardware, depreciation) values ($1, $2, $3, $4, $5) returning *',
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


// @desc		View Asset
// @route 	GET /api/assets/viewAsset
// @access 	Public
const viewAsset = async (req, res) => {
  try {
    const viewAsset = await db.query("SELECT * FROM asset");
    res.json({ status: 200, assets: viewAsset.rows });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addAsset: addAsset,
  viewAsset: viewAsset,
};
