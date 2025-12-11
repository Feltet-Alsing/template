import { z } from 'zod';
import { error } from '@sveltejs/kit';
import { query, form, command } from '$app/server';
import sql from '$lib/db';

// Schemas
const snippetSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required')
});

const snippetIdSchema = z.number();

// QUERY - Get all snippets
export const getAllSnippets = query(async () => {
    const snippets = await sql`
		SELECT * FROM codeSnippets
		ORDER BY created_at DESC
	`;
    return snippets;
});

// QUERY - Get snippet by ID
export const getSnippet = query(snippetIdSchema, async (id) => {
    const [snippet] = await sql`
		SELECT * FROM codeSnippets
		WHERE id = ${id}
	`;

    if (!snippet) error(404, 'Snippet not found');
    return snippet;
});

// FORM - Create snippet
export const createSnippet = form(snippetSchema, async (data) => {
    const [snippet] = await sql`
		INSERT INTO codeSnippets (title, content)
		VALUES (${data.title}, ${data.content})
		RETURNING *
	`;

    // Refresh the list of snippets
    await getAllSnippets().refresh();

    return { success: true, snippet };
});

// FORM - Update snippet
export const updateSnippet = form(
    z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional()
    }),
    async (data) => {
        const updates: string[] = [];
        const values: any[] = [];
        let paramIndex = 2;

        if (data.title !== undefined) {
            updates.push(`title = $${paramIndex++}`);
            values.push(data.title);
        }
        if (data.content !== undefined) {
            updates.push(`content = $${paramIndex++}`);
            values.push(data.content);
        }

        if (updates.length === 0) {
            error(400, 'No fields to update');
        }

        const [snippet] = await sql.unsafe(`
			UPDATE codeSnippets
			SET ${updates.join(', ')}
			WHERE id = $1
			RETURNING *
		`, [data.id, ...values]);

        if (!snippet) error(404, 'Snippet not found');

        // Refresh queries
        await getAllSnippets().refresh();
        await getSnippet(data.id).set(snippet);

        return { success: true, snippet };
    }
);

// COMMAND - Delete snippet
export const deleteSnippet = command(snippetIdSchema, async (id) => {
    const result = await sql`
		DELETE FROM codeSnippets
		WHERE id = ${id}
	`;

    if (result.count === 0) {
        error(404, 'Snippet not found');
    }

    // Refresh the list
    await getAllSnippets().refresh();
});
