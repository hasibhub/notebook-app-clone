const { updateUserByAdmin } = require('../../../services/user/index');
const { badRequest } = require('../../../utils/error');

const updateByAdmin = async (req, res, next) => {
	try {
		const { name, email, role } = req.body;
		const userId = req.params.id;
		const user = await updateUserByAdmin(userId, { role });
		if (!user) throw badRequest();
		const response = {
			message: 'User updated successfully',
			user,
		};
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	updateByAdmin,
};
