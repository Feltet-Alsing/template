import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sql from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
    try {
        console.log('Running migrations...');

        // Read and execute your migration file
        const migration = await readFile(
            join(__dirname, 'migrations', '001.initial.sql'),
            'utf-8'
        );

        await sql.unsafe(migration);
        console.log('✓ Migration 001.initial.sql completed');

        await sql.end();
        console.log('✓ All migrations completed');
    } catch (error) {
        console.error('Migration failed:', error);
        await sql.end();
        process.exit(1);
    }
}

migrate();
