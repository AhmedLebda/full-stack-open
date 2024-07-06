import config from "./utils/config";
import app from "./app";

// Starting server
app.listen(config.PORT, () =>
    console.log("Server is running on port: ", config.PORT)
);
