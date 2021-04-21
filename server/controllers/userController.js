const db = require("../db");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// @desc		Auth User and get token
// @route 	POST /api/users/login
// @access 	Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users where email='${email}'`);

    if (user.rowCount !== 0) {
      const pwdInDb = await db.query(
        `SELECT password FROM users WHERE email = '${email}'`
      );
      const pwdhash = pwdInDb.rows[0].password;

      bcrypt.compare(password, pwdhash, function (err, result) {
        if (result) {
          res.json({
            status: 200,
            userid: user.rows[0].userid,
            email: user.rows[0].email,
            name: user.rows[0].name,
            role: user.rows[0].role,
            token: generateToken(user.rows[0].userid),
          });
        } else {
          res.json({ status: 401, message: "Password Incorrect" });
        }
      });
    } else {
      res.json({ status: 401, message: "Email not Present" });
    }
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc		Register a user
// @route 	POST /api/users
// @access 	Public
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await db.query("SELECT * FROM users where email=$1", [email]);

  if (user.rowCount !== 0) {
    return res.json({ status: 401, message: "User Already Exists" });
  }

  try {
    if (req.user.role === "admin") {
      if (role) {
        const results = await db.query(
          "INSERT INTO users (name, email, password, role, createby) values ($1, $2, $3, $4, $5) returning *",
          [name, email, bcrypt.hashSync(password, 10), role, req.user.name]
        );
        const token = generateToken(results.rows[0].userid);
        res.status(201).json({
          status: 201,
          userid: results.rows[0].userid,
          name: results.rows[0].name,
          email: results.rows[0].email,
          role: results.rows[0].role,
          token: token,
        });
      } else {
        const results = await db.query(
          "INSERT INTO users (name, email, password, createby) values ($1, $2, $3, $4) returning *",
          [name, email, bcrypt.hashSync(password, 10), req.user.name]
        );
        const token = generateToken(results.rows[0].userid);
        res.status(201).json({
          status: 201,
          userid: results.rows[0].userid,
          name: results.rows[0].name,
          email: results.rows[0].email,
          role: results.rows[0].role,
          token: token,
        });
      }
    }
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};
const viewUser = async (req, res) => {
  const view = await db.query("SELECT userid,name,email,role FROM users");
  res.status(201).json({ data: view.rows}) 
 };
 const removeUser = async (req,res) => {
  try{
      const results=await db.query("DELETE from users where userid=$1 returning *",[req.body.userid]);
      const view = await db.query("SELECT userid,name,email,role FROM users");
      res.status(200).json({ status: 'success',data :view.rows});
  }
  catch (error) {
      res.status(500).json({status:"failed"});
  }
}
const searchUser = async (req, res) => {
  try{
    console.log(req.body.name);
  const searcheduser = await db.query("SELECT name,email,role,userid FROM users where name=$1",[req.body.name]);
  res.status(201).json({ data: searcheduser.rows})
  }
  catch(error){
    res.status(401).json({status:"failed"});
  }
 };
 

module.exports = {
  authUser: authUser,
  addUser: addUser,
  viewUser: viewUser,
  removeUser :removeUser,
  searchUser :searchUser,

};
