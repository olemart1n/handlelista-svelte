import { error } from '@sveltejs/kit';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client/web';

const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

/**
 * @param {string} id
 */
async function getList(id) {
	const res = await turso.execute({
		sql: 'SELECT * FROM lists WHERE id= ?',
		args: [id]
	});
	return res.rows[0];
}
/**
 *
 * @param {string} id
 */
async function getListItems(id) {
	const res = await turso.execute({
		sql: 'SELECT * FROM items WHERE list_id= ?',
		args: [id]
	});
	if (res.rows === undefined) return [];
	return res.rows;
}

export async function load({ params, cookies }) {
	const id = params.slug;
	const data = await Promise.all([getList(id), getListItems(id)]);
	if (!data[0]) throw error(404);
	/**
	 * @type {string} title
	 */
	const title = typeof data[0].title === 'string' ? data[0].title : '';

	const alreadyStored = cookies.get('lists');
	if (alreadyStored) {
		/**
		 * @typedef {Object} obj
		 * @property {string} id
		 * @property {string} title
		 */

		/**
		 * @type {obj []} parsed
		 */
		const parsed = JSON.parse(alreadyStored);
		if (!parsed.find((obj) => obj.id === id)) {
			const title = typeof data[0].title === 'string' ? data[0].title : '';
			parsed.push({ id, title });
			cookies.delete('lists', { path: '/' });
			cookies.set('lists', JSON.stringify(parsed), {
				path: '/',
				expires: new Date('9999-12-31T23:59:59'),
				domain: '.handlelista.no'
			});
		}
	} else {
		cookies.set('lists', JSON.stringify([{ id, title }]), {
			path: '/',
			expires: new Date('9999-12-31T23:59:59'),
			domain: '.handlelista.no'
		});
	}

	return { list: data[0], items: data[1], listId: params.slug };
}
