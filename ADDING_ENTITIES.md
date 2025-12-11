# Adding a New Entity - Quick Guide

Now adding a new database entity only requires **3 simple steps**:

## Step 1: Add to Config

Edit [`src/lib/db/entities.config.ts`](src/lib/db/entities.config.ts):

```typescript
export const entities = {
    snippets: { /* existing */ },
    
    // Add your new entity:
    users: {
        table: 'users',
        schema: z.object({
            name: z.string().min(1),
            email: z.string().email(),
            age: z.number().optional()
        }),
        fields: ['name', 'email', 'age']
    }
};
```

## Step 2: Add Exports

Edit [`src/lib/db/entities.remote.ts`](src/lib/db/entities.remote.ts):

```typescript
// Add after snippets:
const usersCrud = createCrud(entities.users);

export const getAllUsers = usersCrud.getAll;
export const getUser = usersCrud.getById;
export const createUser = usersCrud.create;
export const updateUser = usersCrud.update;
export const deleteUser = usersCrud.delete;
```

## Step 3: Register

Edit [`src/lib/db/registry.ts`](src/lib/db/registry.ts):

```typescript
import {
    // ... existing imports
    getAllUsers, getUser, createUser, updateUser, deleteUser
} from './entities.remote';

export const db = {
    snippets: { /* existing */ },
    
    // Add your entity:
    users: {
        getAll: getAllUsers,
        getById: getUser,
        create: createUser,
        update: updateUser,
        delete: deleteUser
    }
};
```

## Step 4: Create Migration & Run

Create `src/lib/migrations/002.users.sql`:
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

Update `src/lib/migrate.ts` to include the new migration file.

Run:
```bash
yarn migrate
```

## Step 5: Use It!

```svelte
<script>
    import { db } from '$lib/db/registry';
</script>

{#each await db.users.getAll() as user}
    <p>{user.name} - {user.email}</p>
{/each}

<form {...db.users.create}>
    <input name="name" required />
    <input name="email" type="email" required />
    <input name="age" type="number" />
    <button>Create User</button>
</form>
```

---

## Summary

Previously: **~5 files** to edit + understanding the architecture
Now: **3 files** (config, remote, registry) with clear patterns to copy-paste

The config-first approach makes it much clearer where everything is defined!
