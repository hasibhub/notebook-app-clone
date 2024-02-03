const { create } = require('./createUser');
const { getAllUser } = require('./getAllUser');
const { getSingle } = require('./getSingle');
const { updateByAdmin } = require('./updateByAdmin');
const { deleteUser } = require('./deleteUser');

module.exports = {
	create,
	getAllUser,
	getSingle,
	updateByAdmin,
	deleteUser,
};
