import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/sveltekit_db', {
    max: 10,
    idle_timeout: 20
});

export default sql;
