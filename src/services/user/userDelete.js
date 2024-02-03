const { notFound, badRequest } = require('./../../utils/error');
const { User, Note } = require('./../../models/index');

const userDelete = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) throw notFound('User not exist');
		const deleteUser = await user.deleteOne();
		const deleteNote = await Note.find({ owner: user.id }).deleteMany();
		if (deleteUser.acknowledged && deleteNote.acknowledged) {
			return true;
		}
		return false;
	} catch (error) {
		throw badRequest(error);
	}
};

module.exports = {
	userDelete,
};
