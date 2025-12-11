/**
 * Auto-generated CRUD Operations from Entity Config
 * 
 * This file reads entities.config.ts and exports all CRUD operations.
 * All exports are remote functions that can be used in Svelte components.
 */

import { createCrud } from './crud-factory';
import { entities } from './entities.config';

// Generate CRUD operations for snippets
const snippetsCrud = createCrud(entities.snippets);

export const getAllSnippets = snippetsCrud.getAll;
export const getSnippet = snippetsCrud.getById;
export const createSnippet = snippetsCrud.create;
export const updateSnippet = snippetsCrud.update;
export const deleteSnippet = snippetsCrud.delete;

// Add more entities here as you add them to entities.config.ts
// The pattern is:
// const yourEntityCrud = createCrud(entities.yourEntity);
// export const getAllYourEntities = yourEntityCrud.getAll;
// export const getYourEntity = yourEntityCrud.getById;
// export const createYourEntity = yourEntityCrud.create;
// export const updateYourEntity = yourEntityCrud.update;
// export const deleteYourEntity = yourEntityCrud.delete;
