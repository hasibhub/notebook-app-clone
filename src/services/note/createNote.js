const { Note } = require('../../models/index');
const { badRequest } = require('../../utils/error');

const createNote = async ({ title, body, label = 'normal', owner }) => {
	if (!title || !body || !owner) throw badRequest();
	const note = new Note({ title, body, label, owner });
	await note.save();
	return { ...note._doc, id: note.id };
};

module.exports = createNote;
