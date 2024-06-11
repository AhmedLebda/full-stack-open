const mongoose = require("mongoose");
const config = require("./utils/config.cjs");

async function dbConnection() {
    const dbName = config.MONGO_URI.split("=").slice(-1);
    console.log(`connecting to db: ${dbName}`);
    await mongoose.connect(config.MONGO_URI);
    console.log(`Successfully connected to db: ${dbName}`);
}
module.exports = dbConnection;
