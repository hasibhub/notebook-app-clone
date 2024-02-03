const { deleteNoteByOwner } = require('../../../services/note/index');
const { badRequest } = require('../../../utils/error');
const deleteByOwner = async (req, res, next) => {
	try {
		const id = req.params.id;
		const ownerId = req.user.id;
		const note = await deleteNoteByOwner(id, ownerId);
		if (!note) {
			next(new Error('Something went wrong'));
		}
		res.status(204).json({
			message: 'Note deleted successfully',
			status: note.code,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	deleteByOwner,
};
