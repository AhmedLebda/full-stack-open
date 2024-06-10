const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./utils/config.cjs");
const errorHandler = require("./utils/middlewares/errorHandler.cjs");
// ### Routes ### //
const blogRoutes = require("./routes/blogs.cjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

// Connect to db and start server
main();

// ### Routes ### //
app.use("/api/blogs", blogRoutes);

// Unknown endpoint
app.use((req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
});

// Error handler middleware
app.use(errorHandler);

// Connect to db and start server
async function main() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(`Successfully connected to "blog_fullStackOpen" db`);

        app.listen(config.PORT, () =>
            console.log("your server is running on port:" + config.PORT)
        );
    } catch (err) {
        console.log(err.message);
    }
}
