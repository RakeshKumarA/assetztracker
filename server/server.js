const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});
