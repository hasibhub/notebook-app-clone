const { notFound, authorizationError } = require('././../../utils/error');
const { Note } = require('../../models/index');

const deleteNoteByOwner = async (id, ownerId) => {
	const note = await Note.findById(id);
	if (!note) throw notFound();
	if (note.owner.toString() !== ownerId) {
		throw authorizationError();
	}
	await note.deleteOne();
	return { code: 204 };
};

module.exports = deleteNoteByOwner;
