const create = require('./create');
const { allNoteByOwner } = require('./getByOwner');
const { getSingleNote } = require('./getSingle');
const { update } = require('./update');
const { deleteByOwner } = require('./deleteByOwner');

module.exports = {
	create,
	allNoteByOwner,
	getSingleNote,
	update,
	deleteByOwner,
};
