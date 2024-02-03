const { userDelete } = require('./../../../services/user/index');
const { badRequest } = require('./../../../utils/error');

const deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const isDeleted = await userDelete(userId);
		if (!isDeleted) {
			throw badRequest('Deletion failed!');
		}
		res.status(204).json({ message: 'User deleted' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	deleteUser,
};
