const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const siteRoutes = require("./routes/site.routes");
const leadRoutes = require("./routes/lead.routes");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/health", healthRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/leads", leadRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
