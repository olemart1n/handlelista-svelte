import { json } from '@sveltejs/kit';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client/web';
import { randomUUID } from 'crypto';
const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

export async function POST({ request, cookies }) {
	try {
		const newId = randomUUID();
		const { title } = await request.json();

		const res = await turso.execute({
			sql: 'INSERT INTO lists (title, id ) VALUES (?, ?) RETURNING *',
			args: [title, newId]
		});
		const list = res.rows[0];

		const value = { id: newId, title: title };
		const alreadyStored = cookies.get('lists');
		if (alreadyStored) {
			cookies.delete('lists', { path: '/' });
			const parsed = JSON.parse(alreadyStored);
			parsed.push(value);
			cookies.set('lists', JSON.stringify(parsed), {
				path: '/',
				expires: new Date('9999-12-31T23:59:59'),
				domain: '.handlelista.no'
			});
		} else {
			cookies.set('lists', JSON.stringify([value]), {
				path: '/',
				expires: new Date('9999-12-31T23:59:59'),
				domain: '.handlelista.no'
			});
		}

		return json({ list }, { status: 201 });
	} catch (error) {
		console.log(error);
	}

	return json({ error: 'error occured' }, { status: 400 });
}
