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

export async function load({ params }) {
	const id = params.slug;

	const data = await Promise.all([getList(id), getListItems(id)]);

	if (!data[0]) throw error(404);

	return { list: data[0], items: data[1], listId: params.slug };
}
