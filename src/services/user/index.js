const createUser = require('./createUser');
const { getAllUsers } = require('./getAllUser');
const { getSingleUser } = require('./getSingleUser');
const { updateUserByAdmin } = require('./updateUserByAdmin');
const { userDelete } = require('./userDelete');

module.exports = {
	createUser,
	getAllUsers,
	getSingleUser,
	updateUserByAdmin,
	userDelete,
};
