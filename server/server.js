const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Logging all HTTP Requests
app.use((req, res, next) => {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(data);
    oldSend.apply(res, arguments);
  };
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});
