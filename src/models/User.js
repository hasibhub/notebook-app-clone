const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		name: {
			type: String,
			minLength: 3,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
			required: true,
		},
		password: {
			type: String,
			select: false,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true,
		id: true,
	}
);

const User = model('user', UserSchema);

module.exports = { User };
