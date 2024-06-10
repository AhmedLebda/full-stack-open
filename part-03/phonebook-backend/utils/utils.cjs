const crypt = require("node:crypto");

const generateRandomId = () => crypt.randomBytes(8).toString("hex");

module.exports = { generateRandomId };
