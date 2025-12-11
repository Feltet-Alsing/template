import { z } from 'zod';
import { createCrud } from '$lib/db/crud-factory';

// Schema - Define the shape of a snippet
const snippetSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required')
});

// Create CRUD operations using the factory
const snippetCrud = createCrud({
    table: 'codeSnippets',
    schema: snippetSchema,
    fields: ['title', 'content']
});

// Export individual operations
export const getAllSnippets = snippetCrud.getAll;
export const getSnippet = snippetCrud.getById;
export const createSnippet = snippetCrud.create;
export const updateSnippet = snippetCrud.update;
export const deleteSnippet = snippetCrud.delete;
