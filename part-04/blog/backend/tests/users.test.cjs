const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.cjs");
const User = require("../models/user.cjs");
const helper = require("../utils/test_helpers/blog_api_helper.cjs");

const api = supertest(app);

// ## Reset the db before every test ## //
beforeEach(async () => {
    console.log("resetting db...");
    await User.deleteMany({});
    const user = new User({
        username: "root",
        password: "UA0FYIgXIYSp2K",
        name: "super user",
    });
    await user.save();

    console.log(`user ${user.name} is created!`);
});

describe("Initial db state", () => {
    test("Have one user", async () => {
        const response = await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /json/);
        assert.strictEqual(response.body.length, 1);
    });

    test("first user username is root", async () => {
        const response = await api.get("/api/users");
        const username = response.body[0].username;
        assert.strictEqual(username, "root");
    });
});

describe("User Creation", () => {
    test("successfully add user to db with correct data", async () => {
        const initialUsers = await helper.usersInDb();

        const user = {
            username: "Lester",
            password: "tI8wDvAjVX9N0u",
            name: "Warren Castillo",
        };

        const response = await api
            .post("/api/users")
            .send(user)
            .expect(201)
            .expect("Content-Type", /json/);

        const updatedUsers = await helper.usersInDb();
        assert.strictEqual(updatedUsers.length, initialUsers.length + 1);
        assert.strictEqual(response.body.username, updatedUsers[1].username);
    });

    test("Fail to add user to db with incorrect data", async () => {
        const initialUsers = await helper.usersInDb();

        const user = {};

        await api.post("/api/users").send(user).expect(400);

        const updatedUsers = await helper.usersInDb();

        assert.strictEqual(updatedUsers.length, initialUsers.length);
    });

    test("Fail to add user with existing username", async () => {
        const initialUsers = await helper.usersInDb();

        const user = {
            username: "root",
            password: "gQSDJwYeo5e",
            name: "Joseph Parks",
        };

        await api.post("/api/users").send(user).expect(400);

        const updatedUsers = await helper.usersInDb();

        assert.strictEqual(updatedUsers.length, initialUsers.length);
    });
});

// ## Close the db connection after running all tests ## //
after(async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
});
