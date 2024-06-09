const mongoose = require("mongoose");

console.log(`==================== usage:
Display all contacts in db:
'node --env-file=.env mongo.cjs

Add contact to db:
'node --env-file=.env mongo.cjs <name> <number>'
===========================`);

const url = process.env.DB_CONNECTION;

mongoose.set("strictQuery", false);

main();

async function main() {
    try {
        await mongoose.connect(url);
        console.log(`Successfully connected to "phone_book" db`);

        const contactSchema = new mongoose.Schema({
            name: { type: String },
            number: { type: String },
        });
        const Contact = mongoose.model("Contact", contactSchema);

        if (process.argv.length < 4) {
            console.log("All contacts in your phone book: ");
            console.log(await Contact.find({}));
            process.exit(1);
        }

        const contact = new Contact({
            name: process.argv[2],
            number: process.argv[3],
        });

        await contact.save();

        console.log("contact saved!");
    } catch (err) {
        console.log(err.message);
    } finally {
        mongoose.connection.close();
    }
}
