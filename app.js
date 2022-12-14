const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const transactionsRouter = require("./routes/api/transactions");
const authRouter = require("./routes/api/auth");
const categoryRouter = require("./routes/api/categories");
const balanceRouter = require("./routes/api/balance");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/transactions", transactionsRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/balance", balanceRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
