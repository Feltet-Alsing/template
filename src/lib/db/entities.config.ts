import { z } from 'zod';

/**
 * Central Entity Configuration
 * 
 * Define all your database entities here. Each entity automatically gets:
 * - getAll() - Query all records
 * - getById(id) - Query single record
 * - create(data) - Create new record with validation
 * - update({ id, ...fields }) - Update record
 * - delete(id) - Delete record
 * 
 * To add a new entity:
 * 1. Add it to this config object
 * 2. Create a migration file (e.g., 002.entity-name.sql)
 * 3. Run `yarn migrate`
 * 4. Use it: db.yourEntity.getAll()
 */

export const entities = {
    snippets: {
        table: 'codeSnippets',
        schema: z.object({
            title: z.string().min(1, 'Title is required'),
            content: z.string().min(1, 'Content is required')
        }),
        fields: ['title', 'content']
    }
    // Add more entities here...
    // users: {
    //     table: 'users',
    //     schema: z.object({
    //         name: z.string().min(1),
    //         email: z.string().email()
    //     }),
    //     fields: ['name', 'email']
    // }
};

export type EntityName = keyof typeof entities;
