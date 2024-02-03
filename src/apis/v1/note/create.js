const { createNote } = require('./../../../services/note/index');
const { badRequest } = require('./../../../utils/error');
const create = async (req, res, next) => {
	try {
		const owner = req.user.id;

		const { title, body, label } = req.body;

		if (!owner) throw badRequest();

		const notePayload = { title, body, label, owner };

		const note = await createNote(notePayload);

		const response = {
			code: 201,
			message: 'Note created successfully',
			note: note,
			link: {
				note: `/notebook/${note.id}`,
			},
		};

		res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
module.exports = create;
