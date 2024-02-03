const { authorizationError } = require('./../utils/error');
const authorization =
	(roles = []) =>
	(req, _res, next) => {
		try {
			if (!roles.includes(req.user.role)) {
				throw authorizationError();
			}
			return next();
		} catch (error) {
			next(error);
		}
	};

module.exports = { authorization };
