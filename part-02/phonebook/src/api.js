const baseUrl = "/api";

const getAllContacts = async () => {
    try {
        const response = await fetch(`${baseUrl}/persons`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (contact) => {
    const response = await fetch(`${baseUrl}/persons`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        throw Error(response.error);
    }

    return await response.json();
};

const deleteContact = async (contactId) => {
    const response = await fetch(`${baseUrl}/persons/${contactId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw Error(response.error);
    }

    return await response.json();
};

const updateContact = async (contact) => {
    const response = await fetch(`${baseUrl}/persons`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        throw Error(response.error);
    }

    return await response.json();
};

export default {
    getAllContacts,
    addContact,
    deleteContact,
    updateContact,
};
