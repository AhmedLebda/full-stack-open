class AssociatedDataError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
		this.name = "AssociatedDataError";
	}
}

module.exports = {
	AssociatedDataError,
};
