/**
 * Database Entity Registry
 * 
 * This file auto-generates the registry from entities.config.ts.
 * To add a new entity:
 * 1. Add it to src/lib/db/entities.config.ts
 * 2. Add the exports to src/lib/db/entities.remote.ts (follow the pattern)
 * 3. Add it to the db object below (follow the pattern)
 * 4. Create migration file and run `yarn migrate`
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
} from './entities.remote';

export const db = {
	snippets: {
		getAll: getAllSnippets,
		getById: getSnippet,
		create: createSnippet,
		update: updateSnippet,
		delete: deleteSnippet
	}
	// Add more entities here as you add them to entities.config.ts
	// Follow this pattern:
	// yourEntity: {
	//     getAll: getAllYourEntities,
	//     getById: getYourEntity,
	//     create: createYourEntity,
	//     update: updateYourEntity,
	//     delete: deleteYourEntity
	// }
};

// Type-safe access to all entities
export type DbEntity = keyof typeof db;
