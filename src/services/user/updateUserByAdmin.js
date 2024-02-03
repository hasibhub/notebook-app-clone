const { User } = require('./../../models/index');
const { notFound, badRequest } = require('../../utils/error');
const updateUserByAdmin = async (userId, { name, email, role }) => {
	try {
		const user = await User.findById(userId);
		if (!user) throw notFound();
		user.role = role || user.role;
		await user.save();
		return user;
	} catch (err) {
		throw badRequest(err);
	}
};

module.exports = {
	updateUserByAdmin,
};
