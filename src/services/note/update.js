const {
	notFound,
	authorizationError,
	badRequest,
} = require('./../../utils/error');
const { Note } = require('../../models/index');

const updateNote = async (id, ownerId, { title, body, label }) => {
	try {
		const note = await Note.findById(id);
		if (!note) throw notFound('Resource not found!');
		if (note.owner.toString() === ownerId) {
			note.title = title || note.title;
			note.body = body || note.body;
			note.label = label || note.label;
			await note.save();
			return note;
		} else {
			throw authorizationError();
		}
	} catch (error) {
		throw badRequest(error);
	}
};

module.exports = updateNote;
