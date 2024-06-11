const PORT = process.env.PORT;
const MONGO_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_CONNECTION
        : process.env.DB_CONNECTION;

module.exports = { PORT, MONGO_URI };
