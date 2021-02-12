const db = require('../db');

// @desc		Add Asset
// @route 	POST /api/assets/
// @access 	Public
const addAsset = async (req, res) => {
  const { onboard, software, hardware, depreciation } = req.body;
  try {
    const results = await db.query(
      'INSERT INTO asset (onboard, software, hardware, depreciation) values ($1, $2, $3, $4) returning *',
      [
        onboard,
        JSON.stringify(software),
        JSON.stringify(hardware),
        depreciation,
      ]
    );
    res.status(201).json({
      status: 201,
      onboard: results.rows[0].onboard,
      software: results.rows[0].software,
      hardware: results.rows[0].hardware,
      depreciation: results.rows[0].depreciation,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

module.exports = {
  addAsset: addAsset,
};
