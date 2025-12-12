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
    notes: {
        table: "notes",
        schema: z.object({
            title: z.string().min(1, "Required"),
            content: z.string().min(1, "Required"),
        }),
        fields: ["title", "content"]
    }
};
