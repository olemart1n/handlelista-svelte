export const load = ({ cookies }) => {
	const lists = cookies.get('lists');
	if (lists === undefined) {
		return { lists: [] };
	}

	return { lists: JSON.parse(lists) };
};
