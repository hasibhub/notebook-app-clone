const createNote = require('./createNote');
const { getAllNoteByOwner } = require('./geByOwner');
const getSingle = require('./getSingle');
const updateNote = require('./update');
const deleteNoteByOwner = require('./deleteByOwner');

module.exports = {
	createNote,
	getAllNoteByOwner,
	getSingle,
	updateNote,
	deleteNoteByOwner,
};
