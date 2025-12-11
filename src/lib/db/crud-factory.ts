import { z, type ZodType } from 'zod';
import { error } from '@sveltejs/kit';
import { query, form, command } from '$app/server';
import sql from '$lib/db';

export interface CrudConfig<T extends ZodType> {
    table: string;
    schema: T;
    fields: string[];
}

export interface CrudOperations<T> {
    getAll: ReturnType<typeof query<T[]>>;
    getById: ReturnType<typeof query<T>>;
    create: ReturnType<typeof form<{ success: boolean; data: T }>>;
    update: ReturnType<typeof form<{ success: boolean; data: T }>>;
    delete: ReturnType<typeof command>;
}

export function createCrud<T extends ZodType>(config: CrudConfig<T>) {
    const { table, schema, fields } = config;

    // Create schema with id for updates
    const updateSchema = z.object({
        id: z.number(),
        ...(Object.fromEntries(
            fields.map((field) => [field, z.any().optional()])
        ) as Record<string, z.ZodOptional<z.ZodAny>>)
    });

    const idSchema = z.number();

    // QUERY - Get all records
    const getAll = query(async () => {
        const records = await sql.unsafe(`
			SELECT * FROM ${table}
			ORDER BY created_at DESC
		`);
        return records;
    });

    // QUERY - Get record by ID
    const getById = query(idSchema, async (id) => {
        const [record] = await sql.unsafe(`
			SELECT * FROM ${table}
			WHERE id = $1
		`, [id]);

        if (!record) error(404, `${table} record not found`);
        return record;
    });

    // FORM - Create record
    const create = form(schema as any, async (data: any) => {
        const fieldNames = fields.join(', ');
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
        const values = fields.map((field) => data[field]);

        const [record] = await sql.unsafe(`
			INSERT INTO ${table} (${fieldNames})
			VALUES (${placeholders})
			RETURNING *
		`, values);

        return { success: true, data: record };
    });

    // FORM - Update record
    const update = form(updateSchema as any, async (data: any) => {
        const updates: string[] = [];
        const values: any[] = [];
        let paramIndex = 2;

        for (const field of fields) {
            if (data[field] !== undefined) {
                updates.push(`${field} = $${paramIndex++}`);
                values.push(data[field]);
            }
        }

        if (updates.length === 0) {
            error(400, 'No fields to update');
        }

        const [record] = await sql.unsafe(`
			UPDATE ${table}
			SET ${updates.join(', ')}
			WHERE id = $1
			RETURNING *
		`, [data.id, ...values]);

        if (!record) error(404, `${table} record not found`);

        return { success: true, data: record };
    });

    // COMMAND - Delete record
    const deleteRecord = command(idSchema, async (id) => {
        const result = await sql.unsafe(`
			DELETE FROM ${table}
			WHERE id = $1
		`, [id]);

        if (result.count === 0) {
            error(404, `${table} record not found`);
        }

        return { success: true };
    });

    return {
        getAll,
        getById,
        create,
        update,
        delete: deleteRecord
    };
}
