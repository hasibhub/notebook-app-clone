const { User } = require('../../models/index');
const { hasUser } = require('../utils/findUser');
const { conflictError } = require('./../../utils/error');
const { hash } = require('../../utils/hash');

/**
 * Create a new user object
 * @param {name,email,password,role} name,email,password,role
 * @returns user
 */

const createUser = async ({ name, email, password, role = 'user' }) => {
	const ifUser = await hasUser({ email });
	if (ifUser) {
		throw conflictError('User already exists!');
	} else {
		password = await hash(password);
		const user = new User({ name, email, password, role });
		await user.save();
		return { ...user._doc, id: user.id };
	}
};

module.exports = createUser;
