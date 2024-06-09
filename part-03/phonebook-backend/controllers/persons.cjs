const Contact = require("../models/contact.cjs");

const contacts_list = async (req, res) => {
    const contacts = await Contact.find({});

    if (!contacts) {
        return res
            .status(400)
            .json({ error: "There are no contacts in the phonebook" });
    }
    res.json(contacts);
};

const contact_create = async (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: "you need to enter a name and number for your contact",
        });
    }

    try {
        const contactExists = await Contact.find({ name });

        if (Object.keys(contactExists).length) {
            throw Error(
                "This contact already exists if you want to update the contact number send a PUT request"
            );
        }

        const createdContact = new Contact(req.body);

        await createdContact.save();
        console.log("contact saved!");

        res.json(createdContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const contact_update = async (req, res) => {
    const { number, id } = req.body;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { number },
            { new: true }
        );
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const contact_details = async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await Contact.findById(id);

        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: "This contact doesn't exist" });
    }
};

const contact_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const contact = await Contact.findByIdAndDelete(id);
        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: "This contact doesn't exist" });
    }
};

const contacts_info = async (req, res) => {
    try {
        const entries = await Contact.find({}).countDocuments();
        res.json({ entries, timestamp: new Date().toString() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    contacts_list,
    contact_create,
    contact_update,
    contact_details,
    contact_delete,
    contacts_info,
};
