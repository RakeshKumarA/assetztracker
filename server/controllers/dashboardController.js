const db = require("../db");

// @desc	Get Asset Count and Assigned Assets
// @route 	GET /api/dashboard/
// @access 	Public
const dashboardLanding = async (req, res) => {
  try {
    const statusCount = await db.query(
      "select onboard #>> '{assetStatus, value}' as status, count(*) from asset group by onboard #>> '{assetStatus, value}'"
    );
    const assigned = statusCount.rows.filter(
      (row) => row.status === "Assigned"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Assigned")[0].count
        )
      : 0;
    const onboarded = statusCount.rows.filter(
      (row) => row.status === "Onboarding"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Onboarding")[0].count
        )
      : 0;
    const instock = statusCount.rows.filter(
      (row) => row.status === "Instock"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Instock")[0].count
        )
      : 0;
    const finalStatusCount = [onboarded, assigned, instock];

    try {
      const categoryCount = await db.query(
        "select onboard #>> '{assetType, value}' as type, count(*) from asset group by onboard #>> '{assetType, value}'"
      );
      const rented = categoryCount.rows.filter(
        (row) => row.type === "rented"
      )[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "rented")[0].count
          )
        : 0;
      const owned = categoryCount.rows.filter((row) => row.type === "owned")[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "owned")[0].count
          )
        : 0;
      const leased = categoryCount.rows.filter(
        (row) => row.type === "leased"
      )[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "leased")[0].count
          )
        : 0;
      const finalCategoryCount = [rented, owned, leased];

      res.status(200).json({
        status: 200,
        stats: {
          assetsCountByStatus: finalStatusCount,
          assetsCountByCategory: finalCategoryCount,
        },
      });
    } catch (error) {
      res.json({ status: 401, message: error.message });
    }
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc	Get Asset Count and Assigned Assets
// @route 	POST /api/dashboard/abs
// @access 	Public

const assetByStatus = async (req, res) => {
  const { assetByStatus } = req.body;

  try {
    const assetByStatusList = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.onboard -> 'assetStatus' ->> 'value' =$1",
      [assetByStatus]
    );
    res.json({
      status: 200,
      assets: assetByStatusList.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc	Get Asset Count and Assigned Assets
// @route 	POST /api/dashboard/abc
// @access 	Public

const assetByCategory = async (req, res) => {
  const { assetByCategory } = req.body;

  try {
    const assetByCategoryList = await db.query(
      "SELECT a2.*,u2.name FROM asset a2, users u2 where (a2.userid=u2.userid) and a2.onboard -> 'assetType' ->> 'value' =$1",
      [assetByCategory]
    );
    res.json({
      status: 200,
      assets: assetByCategoryList.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  dashboardLanding: dashboardLanding,
  assetByStatus: assetByStatus,
  assetByCategory: assetByCategory,
};
