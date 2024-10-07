const { User, Note } = require("./models/index");

const TOTAL_USERS = 5;
const TOTAL_NOTES_PER_USER = 3;

// Populate users table

const createUsers = async () => {
	const usersPromises = [];
	for (let i = 0; i < TOTAL_USERS; i++) {
		usersPromises.push(
			User.create({
				name: `User ${i}`,
				username: `user${i}`,
			})
		);
	}
	return await Promise.all(usersPromises);
};

createNotes = async (usersArray) => {
	const notesPromises = [];
	for (let user of usersArray) {
		for (let i = 0; i < TOTAL_NOTES_PER_USER; i++) {
			notesPromises.push(
				Note.create({
					content: `Note ${i} for user ${user.id}`,
					userId: user.id,
				})
			);
		}
	}
	return await Promise.all(notesPromises);
};

const main = async () => {
	await User.destroy({ where: {} });
	await Note.destroy({ where: {} });

	console.log("Populating users table...");
	const createdUsers = await createUsers();

	console.log("Populating notes table...");
	await createNotes(createdUsers);
};

main();
