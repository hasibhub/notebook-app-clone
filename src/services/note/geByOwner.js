const { Note, User } = require('./../../models/index');
const { search, sort } = require('./../utils/sort&search');

const getAllNoteByOwner = async (ownerId, sortBy, sortType, searchTerm) => {
	const allNotes = await Note.find({ owner: ownerId });
	let notes = [...allNotes];
	notes = sort(sortBy, sortType, notes);
	notes = search(searchTerm, notes);
	return notes;
};
module.exports = {
	getAllNoteByOwner,
};
