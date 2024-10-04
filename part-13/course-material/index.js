const express = require("express");
const app = express();

const { connectToDatabase } = require("./util/db");
const { PORT } = require("./util/config");

const NotesRouter = require("./controllers/notes");
const UsersRouter = require("./controllers/users");
const LoginRouter = require("./controllers/login");

app.use(express.json());

app.use("/api/notes", NotesRouter);
app.use("/api/users", UsersRouter);
app.use("/api/login", LoginRouter);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();
