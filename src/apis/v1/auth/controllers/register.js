const { createUser } = require('./../../../../services/user/index');
const { jwtToken } = require('../../../../utils/token');

/**
 * User registration endpoint
 * @param {object} req request object
 * @param {object} res response object
 * @param {next} next next function
 * @description Creates a new user
 */
const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const user = await createUser({
			name: name,
			email: email,
			password: password,
		});
		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
		const token = jwtToken(payload);
		res.status(201).json({
			message: 'User registration successful',
			code: 201,
			token,
			links: {
				self: `/${user.id}`,
				login: '/auth/login',
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = register;
