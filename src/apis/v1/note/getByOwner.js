const { getAllNoteByOwner } = require('./../../../services/note/index');
const pagination = require('./../../../services/utils/pagination');

const { badRequest } = require('./../../../utils/error');

const allNoteByOwner = async (req, res, next) => {
	try {
		const { page, limit, sort_type, sort_by, search } = req.query;
		const owner = req.user.id;
		if (!owner) throw badRequest();

		const notes = await getAllNoteByOwner(
			owner,
			sort_by,
			sort_type,
			search
		);

		const paginationForNote = pagination(page, limit, notes.length);

		const modifiedNote = notes.map((note) => {
			return { ...note._doc, owner: { id: owner, name: req.user.name } };
		});

		const skipNote = [...modifiedNote].slice(
			(page - 1) * limit,
			page * limit
		);

		// response
		const response = {
			notes: !notes.length ? 'No notes found' : [...skipNote],
			pagination: paginationForNote,
			links: {
				self: '/id',
				next_page: '3',
				prev_page: '1',
				author: '/author id',
			},
		};

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	allNoteByOwner,
};
