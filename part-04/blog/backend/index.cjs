const app = require("./app.cjs");
const config = require("./utils/config.cjs");

// Starting server
app.listen(config.PORT, () =>
    console.log("your server is running on port:" + config.PORT)
);
