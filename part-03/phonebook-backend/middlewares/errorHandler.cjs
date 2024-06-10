const errorhandler = (error, req, res, next) => {
    console.log("Error Name", error.name);
    console.log("Error Msg", error.message);

    // Wrong mongo id
    if (error.name === "CastError") {
        return res.status(400).json({ error: "invalid id" });
    }

    if (error.name === "Error") {
        return res.status(400).json({ error: error.message });
    }

    if (error.name === "ValidationError") {
        return res
            .status(400)
            .json({ error: error.errors[Object.keys(error.errors)].message });
    }

    next(error);
};

module.exports = errorhandler;
