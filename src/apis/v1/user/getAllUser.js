const pagination = require('../../../services/utils/pagination');
const { getAllUsers } = require('../../../services/user/index');
const getAllUser = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, sort_type, sort_by, search } = req.query;
		const users = await getAllUsers(sort_by, sort_type, search);
		const paginationForUser = pagination(page, limit, users.length);
		const skipUser = [...users].slice((page - 1) * limit, page * limit);

		const response = {
			message: 'All users List:',
			user_count: users.length,
			users: [...skipUser],
			pagination: paginationForUser,
		};
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAllUser,
};
