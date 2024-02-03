const search = async (searchTerm = '', items = []) => {
	return items.filter((item) =>
		item._doc.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
};

const searchUser = async (
	searchTerm = '',
	items = [],
	searchParam = 'name'
) => {
	return items.filter((item) =>
		item._doc[searchParam].toLowerCase().includes(searchTerm.toLowerCase())
	);
};

const sort = (sortBy, sortType, items = []) => {
	return items.sort((a, b) => {
		if (sortType === 'des') {
			return b[sortBy].toString().localeCompare(a[sortBy].toString());
		} else if (sortType === 'asc') {
			return a[sortBy].toString().localeCompare(b[sortBy].toString());
		} else {
			return 0;
		}
	});
};

module.exports = {
	search,
	sort,
	searchUser,
};
