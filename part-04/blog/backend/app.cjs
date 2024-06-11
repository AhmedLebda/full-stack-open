const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./utils/middlewares/errorHandler.cjs");
const dbConnection = require("./dbConnection.cjs");

const blogRoutes = require("./routes/blogs.cjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

// Connect to db
dbConnection();

// ### Routes ### //
app.use("/api/blogs", blogRoutes);

// Unknown endpoint
app.use((req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
