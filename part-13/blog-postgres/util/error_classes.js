class AssociatedDataError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
		this.name = "AssociatedDataError";
	}
}

class JwtError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 401;
		this.name = "JwtError";
	}
}

class PermissionError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 403;
		this.name = "PermissionError";
	}
}

module.exports = {
	AssociatedDataError,
	JwtError,
	PermissionError,
};
