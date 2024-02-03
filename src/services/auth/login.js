const { findUser } = require('./../utils/findUser');
const { notFound, badRequest } = require('../../utils/error');
const { compareHash } = require('../../utils/hash');
const { User } = require('./../../models/index');

/**
 * Login a user
 * @param {email, password} email,password
 * @returns User
 */
const loginUser = async ({ email, password }) => {
	const user = await User.findOne({ email }).select('+password');
	if (!user) throw notFound('Invalid credentials!');
	const userIsValid = await compareHash(password, user.password);

	if (userIsValid) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	} else throw badRequest('Invalid credentials!');
};

module.exports = loginUser;
