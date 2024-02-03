const { createUser } = require('./../../../services/user/index');
//Admin only controller
const create = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;
		const isAdmin = req.user.role;

		if (isAdmin === 'admin') {
			const user = await createUser({ name, email, password, role });
			res.status(201).json({
				message: 'User created successfully',
				link: {
					user: `/${user.id}`,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	create,
};
