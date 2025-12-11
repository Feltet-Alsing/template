# Registry Pattern Implementation Summary

## What Changed

The database operations have been refactored to use a **generic CRUD factory pattern with registry**, making it easy to add new entities without duplicating code.

## New File Structure

```
src/lib/
  ├── db.ts                          (unchanged - postgres connection)
  ├── db/
  │   ├── crud-factory.ts            (NEW - generic CRUD generator)
  │   ├── registry.ts                (NEW - central entity registry)
  │   └── entities/
  │       └── users.remote.ts.example (NEW - example for adding entities)
  ├── snippets.remote.ts             (REFACTORED - now uses factory)
  └── migrations/
      ├── 001.initial.sql            (unchanged)
      └── 002.users.sql.example      (NEW - example migration)
```

## How to Use

### Option 1: Registry Pattern (Recommended)

```svelte
<script>
  import { db } from '$lib/db/registry';
</script>

<!-- All CRUD operations available -->
{#each await db.snippets.getAll() as snippet}
  <div>{snippet.title}</div>
{/each}

<form {...db.snippets.create}>
  <input {...db.snippets.create.fields.title.as('text')} />
  <textarea {...db.snippets.create.fields.content.as('text')}></textarea>
  <button>Create</button>
</form>
```

### Option 2: Individual Imports (Backward Compatible)

```svelte
<script>
  import { getAllSnippets, createSnippet } from '$lib/snippets.remote';
</script>

{#each await getAllSnippets() as snippet}
  <div>{snippet.title}</div>
{/each}
```

## Adding a New Entity

### 1. Create Migration File

`src/lib/migrations/002.users.sql`:
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Create Entity File

`src/lib/db/entities/users.remote.ts`:
```typescript
import { z } from 'zod';
import { createCrud } from '$lib/db/crud-factory';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export const users = createCrud({
  table: 'users',
  schema: userSchema,
  fields: ['name', 'email']
});
```

### 3. Register in Registry

`src/lib/db/registry.ts`:
```typescript
import { snippets } from '$lib/snippets.remote';
import { users } from '$lib/db/entities/users.remote';

export const db = {
  snippets,
  users  // ← Add here
};
```

### 4. Use Immediately

```svelte
<script>
  import { db } from '$lib/db/registry';
</script>

{#each await db.users.getAll() as user}
  <p>{user.name} - {user.email}</p>
{/each}
```

## Available Operations

Every entity created with `createCrud()` automatically gets:

- **`getAll()`** - Get all records (ordered by created_at DESC)
- **`getById(id)`** - Get single record by ID
- **`create(data)`** - Create new record with form validation
- **`update({ id, ...fields })`** - Update record (only provided fields)
- **`delete(id)`** - Delete record by ID

## Benefits

✅ **DRY** - Write CRUD logic once, reuse everywhere
✅ **Type-safe** - Full TypeScript support with Zod validation
✅ **Easy to extend** - Add new entities in minutes
✅ **Backward compatible** - Existing code still works
✅ **Discoverable** - All entities visible in one registry file
✅ **No boilerplate** - Just config object and you're done

## Example: Adding Blog Posts

1. Migration (`003.posts.sql`):
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

2. Entity (`posts.remote.ts`):
```typescript
import { z } from 'zod';
import { createCrud } from '$lib/db/crud-factory';

export const posts = createCrud({
  table: 'posts',
  schema: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    author_id: z.number()
  }),
  fields: ['title', 'body', 'author_id']
});
```

3. Register and use:
```typescript
export const db = { snippets, users, posts };
```

That's it! 🎉
