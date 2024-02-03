const { Note } = require('./../../models/index');
const { badRequest, notFound } = require('./../../utils/error');

const getSingle = async (noteId, ownerId) => {
	const note = await Note.findById(noteId);
	if (!note) throw notFound('Note not found!');

	if (note.owner.toString() === ownerId) {
		return note._doc;
	}
	return badRequest();
};

module.exports = getSingle;
