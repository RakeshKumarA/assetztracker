const db = require("../db");
var format = require("pg-format");

// @desc	Add Employee
// @route 	POST /api/employee
// @access 	Private
const addEmployee = async (req, res) => {
  const { employees } = req.body;

  try {
    const results = await db.query(
      format(
        "INSERT INTO employee (empid, empName, countryCode) VALUES %L returning *",
        employees
      ),
      [],
      (err) => {
        res.json({ status: 500, message: err.message });
      }
    );
    res.status(201).json({
      status: 201,
      employees: results.rows,
    });
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc	View List of Employess
// @route 	GET /api/employee/view
// @access 	Private
const viewEmployee = async (req, res) => {
  try {
    const view = await db.query("SELECT * FROM employee");
    res.json({ status: 200, employees: view.rows });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc	Search users by Name
// @route 	POST /api/employee/search
// @access 	Private
const searchEmployee = async (req, res) => {
  const { empName } = req.body;

  try {
    const searchedEmployee = await db.query(
      "SELECT empid, empName, countryCode FROM employee WHERE empName=$1",
      [empName]
    );

    res.json({
      status: 200,
      noOfEmployees: searchedEmployee.rowCount,
      employees: searchedEmployee.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc		Download Employees
// @route 	POST /api/employee/downemp
// @access 	Public

const downlEmp = async (req, res) => {
  const { id } = req.body;

  try {
    const downloadedEmployees = await db.query(
      "SELECT empid, empname, countrycode FROM employee where id = ANY($1::int[])",
      [id]
    );

    res.json({
      status: 200,
      employees: downloadedEmployees.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addEmployee: addEmployee,
  viewEmployee: viewEmployee,
  searchEmployee: searchEmployee,
  downlEmp: downlEmp,
};
