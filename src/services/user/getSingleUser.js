const { notFound } = require('./../../utils/error');
const { findUser } = require('./../utils/findUser');
const { Note, User } = require('./../../models/index');

const getSingleUser = async (userId) => {
	const user = await User.findById(userId).select('name email role');
	if (!user) throw notFound('Invalid user!');
	const notes = await Note.find({ owner: user.id }).select(
		'title body label'
	);
	return { user, notes };
};

module.exports = {
	getSingleUser,
};
