const { getSingleUser } = require('./../../../services/user/index');

const getSingle = async (req, res, next) => {
	const userId = req.params.id;
	const { user, notes } = await getSingleUser(userId);

	const response = {
		user: {
			...user._doc,
			notes,
		},
		link: {
			owner: `/users/${user.id}`,
		},
	};
	res.status(200).json(response);
};
module.exports = {
	getSingle,
};
