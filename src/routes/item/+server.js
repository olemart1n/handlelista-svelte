import { json } from '@sveltejs/kit';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client/web';
const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

export async function PUT({ request }) {
	const { itemId } = await request.json();
	const res = await turso.execute({
		sql: 'UPDATE items SET purchased = true WHERE id = ?',
		args: [itemId]
	});
	if (res.rowsAffected > 0) {
		return json({ message: 'item purchased status set to true' }, { status: 203 });
	}
	return json({ error: 'error occured' }, { status: 400 });
}
export async function POST({ request }) {
	const { listId, name } = await request.json();
	const res = await turso.execute({
		sql: 'INSERT INTO items (name, list_id) VALUES (?, ?) RETURNING *',
		args: [name, listId]
	});
	if (res.rows.length > 0) {
		return json(res.rows[0], { status: 201 });
	}
	return json({ error: 'error occured' }, { status: 400 });
}

// /**
//  * @type {Function}
//  * @param {Object} item - The new list object to be added.
//  * @param {number} item.id - The unique identifier for the new item.
//  * @param {string} item.name - The name of the new item.
//  */
// export let onItemAdd;
