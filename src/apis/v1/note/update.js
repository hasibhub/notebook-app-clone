const { updateNote } = require('../../../services/note/index');
const update = async (req, res, next) => {
	try {
		const id = req.params.id;
		const ownerId = req.user.id;
		const { title, body, label } = req.body;
		const note = await updateNote(id, ownerId, { title, body, label });

		res.status(200).json({
			message: 'Note updated successfully',
			code: 200,
			note: {
				title: note.title,
				body: note.body,
				label: note.label,
				updatedAt: note.updatedAt,
				createdAt: note.createdAt,
			},
			links: {
				self: `/${note.id}`,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	update,
};
