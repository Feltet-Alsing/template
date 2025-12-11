/**
 * Database Entity Registry
 * 
 * This file serves as a central registry for all database entities.
 * To add a new entity:
 * 1. Create a new file in lib/db/entities/ (e.g., users.remote.ts)
 * 2. Import the individual operations here
 * 3. Add them to the db object below
 * 
 * Usage:
 *   import { db } from '$lib/db/registry';
 *   const snippets = await db.snippets.getAll();
 *   await db.snippets.create({ title: '...', content: '...' });
 */

import {
    getAllSnippets,
    getSnippet,
    createSnippet,
    updateSnippet,
    deleteSnippet
} from '$lib/snippets.remote';

export const db = {
    snippets: {
        getAll: getAllSnippets,
        getById: getSnippet,
        create: createSnippet,
        update: updateSnippet,
        delete: deleteSnippet
    }
};

// Type-safe access to all entities
export type DbEntity = keyof typeof db;
