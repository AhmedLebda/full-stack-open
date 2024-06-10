const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorhandler = require("./middlewares/errorHandler.cjs");

//### Routes
const persons_routes = require("./routes/persons.cjs");

const app = express();

//### Middlewares
app.use(express.json());

// Define a custom token for logging request body
morgan.token("req-body", (req, res) => JSON.stringify(req.body));
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :req-body"
    )
);

mongoose.set("strictQuery", false);

// Cors
app.use(cors());

// Statics
app.use(express.static("public"));

// Connection
main();

// Routes
app.use("/api/persons", persons_routes);

// Unknown endpoint
app.use((req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
});

app.use(errorhandler);

async function main() {
    const url = process.env.DB_CONNECTION;
    try {
        await mongoose.connect(url);
        console.log(`Successfully connected to "phone_book" db`);

        app.listen(process.env.PORT, () =>
            console.log("your server is running on port:" + process.env.PORT)
        );
    } catch (err) {
        console.log(err.message);
    }
}
