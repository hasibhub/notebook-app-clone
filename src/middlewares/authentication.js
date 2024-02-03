const { decoded } = require('./../utils/token');
const { User } = require('./../models/index');
const { findUser } = require('./../services/utils/findUser');
const { authenticateError, badRequest } = require('./../utils/error');

const authentication = async (req, _res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodeToken = decoded(token);
		const user = await User.findById(decodeToken.id);

		if (!user) {
			throw badRequest();
		}
		if (user.email === decodeToken.email) {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	authentication,
};
