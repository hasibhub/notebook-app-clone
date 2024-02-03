const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
const db_password = process.env.DB_USER_PASSWORD;

const ConnectionString = mongoConnectionString.replace(
	'<password>',
	db_password
);

const dbConnect = async () => {
	const connect = await mongoose.connect(ConnectionString, {
		serverSelectionTimeoutMS: 15000,
	});
	return connect;
};

module.exports = dbConnect;
