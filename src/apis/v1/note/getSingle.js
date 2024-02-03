const { getSingle } = require('./../../../services/note/index');
const getSingleNote = async (req, res, next) => {
	try {
		const id = req.params.id;
		const owner = req.user.id;
		const note = await getSingle(id, owner);

		const modified = { ...note };
		delete modified.owner;
		res.status(200).json({
			data: modified,
			links: {
				owner: `/${note.owner}`,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getSingleNote,
};
