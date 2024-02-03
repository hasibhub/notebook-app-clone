const { User } = require('../../models/index.js');

const hasUser = async (props) => {
	const user = await User.findOne(props);
	return user ? true : false;
};

const findUser = async (props) => {
	const user = await User.findOne(props).select('+password');
	return user ? user : false;
};

module.exports = {
	hasUser,
	findUser,
};
