const express = require("express");
const route = express.Router();

const personsController = require("../controllers/persons.cjs");

route.get("/", personsController.contacts_list);

route.post("/", personsController.contact_create);

route.put("/", personsController.contact_update);

route.get("/info", personsController.contacts_info);

route.get("/:id", personsController.contact_details);

route.delete("/:id", personsController.contact_delete);

module.exports = route;
