const { Schema, model } = require('mongoose');

const NoteSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.ObjectId,
			ref: 'user',
			required: true,
		},
		label: {
			type: String,
			enum: ['normal', 'important', 'very important'],
			default: 'normal',
		},
	},
	{
		timestamps: true,
		id: true,
	}
);

const Note = model('note', NoteSchema);

module.exports = { Note };
