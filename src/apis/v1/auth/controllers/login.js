const loginUser = require('../../../../services/auth/login');
const { jwtToken } = require('./../../../../utils/token');

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await loginUser({ email, password });
		const token = jwtToken({ ...user });

		res.status(200).json({
			message: 'User login successful',
			token,
			links: {
				self: `/${user.id}`,
				register: '/auth/register',
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = login;
