# SvelteKit + PostgreSQL Docker Template

A production-ready SvelteKit template with PostgreSQL database, Docker, and Docker Compose configuration.

## Features

- 🚀 **SvelteKit 2** - Modern full-stack framework
- 🐘 **PostgreSQL 16** - Reliable database with Alpine image
- 🐳 **Docker & Docker Compose** - Containerized development and production
- 📦 **Yarn** - Fast, reliable package manager
- 🔧 **TypeScript** - Type-safe development
- ✨ **ESLint & Prettier** - Code quality and formatting

## Quick Start

### Option 1: Using degit (Recommended)

```sh
npx degit <your-username>/<repo-name> my-new-project
cd my-new-project
yarn setup
```

### Option 2: Using GitHub Template

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Run setup:

```sh
cd my-new-project
yarn setup
```

### Option 3: Manual Clone

```sh
git clone <your-repo-url> my-new-project
cd my-new-project
rm -rf .git
git init
yarn setup
```

## Setup Script

The `yarn setup` command will:
- Install all dependencies
- Copy `.env.example` to `.env`
- Initialize git (if needed)
- Provide next steps

## Development

### Local Development (without Docker)

```sh
# Start PostgreSQL only
docker compose up postgres -d

# Start dev server
yarn dev
```

Visit `http://localhost:5173`

### Full Docker Development

```sh
# Start all services
docker compose up

# Start in detached mode
docker compose up -d
```

## Database

### Connection Details

- **Host**: `localhost` (or `postgres` from inside Docker)
- **Port**: `5432`
- **Database**: `sveltekit_db` (configurable in `.env`)
- **User**: `postgres` (configurable in `.env`)
- **Password**: `postgres` (configurable in `.env`)

### Database Setup

This template includes:
- **postgres** - Fast PostgreSQL client for Node.js
- Database connection in [src/lib/db.ts](src/lib/db.ts)
- Migration system with example table
- `yarn migrate` command to run migrations

### Running Migrations

```sh
# Start PostgreSQL
docker compose up postgres -d

# Run migrations
yarn migrate
```

### Connect to Database

```sh
# Using psql from host
psql postgresql://postgres:postgres@localhost:5432/sveltekit_db

# Using Docker
docker compose exec postgres psql -U postgres -d sveltekit_db
```

### Using the Database in Your App

```typescript
import sql from '$lib/db';

// Query example
const snippets = await sql`SELECT * FROM codeSnippets`;
```

## Environment Variables

Copy `.env.example` to `.env` and customize:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=sveltekit_db
POSTGRES_PORT=5432

APP_PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sveltekit_db

NODE_ENV=development
```

## Scripts

```sh
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn check        # Type-check
yarn lint         # Run linter
yarn format       # Format code
yarn setup        # Initialize new project
yarn migrate      # Run database migrations
```

## Docker Commands

```sh
# Start services
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# Rebuild and start
docker compose up --build

# View logs
docker compose logs -f

# Stop and remove volumes (deletes database data!)
docker compose down -v
```

## Production Deployment

The included Dockerfile uses multi-stage builds for optimal image size:

```sh
# Build production image
docker build -t my-app .

# Run container
docker run -p 3000:3000 -e DATABASE_URL=your_db_url my-app
```

## Project Structure

```
.
├── src/
│   ├── lib/           # Shared components & utilities
│   ├── routes/        # SvelteKit routes
│   ├── app.html       # HTML template
│   └── app.d.ts       # Type definitions
├── static/            # Static assets
├── docker-compose.yml # Docker services
├── Dockerfile         # Production image
├── .env.example       # Environment template
└── package.json       # Dependencies
```

## Next Steps

1. Add your database ORM (Prisma, Drizzle, etc.)
2. Configure authentication
3. Add your routes and components
4. Set up CI/CD pipeline
5. Configure production database

## License

MIT
