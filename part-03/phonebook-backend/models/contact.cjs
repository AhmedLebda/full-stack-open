const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name has to be at least three characters long"],
        maxLength: [25, "Name is too long"],
    },
    number: {
        type: String,
        minLength: [8, "Number has to be at least eight characters long"],
        maxLength: [13, "Number is too long"],
        validate: [
            function (value) {
                return /^\d{2,3}-\d+$/.test(value);
            },
            "Number format eg: 123-12345 or 12-123456",
        ],
    },
});

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Contact", contactSchema);
