const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn("users", "disabled", {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			validate: {
				isBoolean: true,
			},
		});

		await queryInterface.addColumn("users", "active_session", {
			type: DataTypes.STRING,
			defaultValue: null,
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn("users", "disabled");
		await queryInterface.removeColumn("users", "active_session");
	},
};
