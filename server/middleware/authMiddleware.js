const jwt = require('jsonwebtoken');
const db = require('../db');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const results = await db.query(
        `SELECT id, name, password, email, isadmin FROM users WHERE id = ${decoded.id}`
      );
      req.user = results.rows[0];
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not Authorized' });
    }
  }
};

module.exports = protect;
