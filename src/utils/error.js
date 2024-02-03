const notFound = (msg = 'Resource Not Found!') => {
	const error = new Error(msg);
	error.code = 404;
	return error;
};

const conflictError = (msg = 'Resource already exist') => {
	const error = new Error(msg);
	error.code = 409;
	return error;
};

const badRequest = (msg = 'Bad request') => {
	const error = new Error(msg);
	error.code = 400;
	return error;
};

const authenticateError = (msg = 'Authenticate Failed') => {
	const error = new Error(msg);
	error.code = 401;
	return error;
};

const authorizationError = (msg = 'Permission denied!') => {
	const error = new Error(msg);
	error.code = 403;
	return error;
};

module.exports = {
	notFound,
	conflictError,
	badRequest,
	authenticateError,
	authorizationError,
};
