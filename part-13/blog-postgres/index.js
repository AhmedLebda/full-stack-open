const express = require("express");
const app = express();
require("express-async-errors");

const { PORT } = require("./util/config");
const { ConnectToDatabase } = require("./util/db");

const errorHandler = require("./middlewares/error/errorHandler");
const BlogRouter = require("./controllers/blog");
const UserRouter = require("./controllers/user");
const AuthRouter = require("./controllers/auth");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/blogs", BlogRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);

// Error handler
app.use(errorHandler);

// Start server and connect to database
const start = async () => {
	try {
		await ConnectToDatabase();
		app.listen(PORT, () => {
			console.log("Server is running on port 3000");
		});
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

start();
