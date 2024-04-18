# Handlelista-svelte

[Handlelista](https://svelte.hanslelista.no)

`git clone https://github.com/olemart1n/handlelista-svelte.git`

`npm run install`

create a database and run `turso db shell http://127.0.0.1:8080` & `turso dev` in the terminal

```
TURSO_DATABASE_URL=http://127.0.0.1:8080
TURSO_AUTH_TOKEN=
```

```sql
CREATE TABLE items (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	name TEXT NOT NULL,
	list_id INTEGER,
	extra_info TEXT,
	purchased BOOLEAN DEFAULT 0,
	FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);                                                               

CREATE TABLE lists (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

`npm run dev`
