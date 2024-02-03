const { User } = require('./../../models/index');
const { notFound } = require('./../../utils/error');
const { searchUser, sort } = require('./../utils/sort&search');

const getAllUsers = async (sortBy, sortType, searchTerm, searchParam) => {
	const userArr = await User.find();
	if (!userArr.length) throw notFound();
	let users = [...userArr];
	users = sort(sortBy, sortType, users);
	users = searchUser(searchTerm, users, searchParam);
	return users;
};

module.exports = {
	getAllUsers,
};
