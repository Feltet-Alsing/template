#!/bin/sh
set -e

echo "Running database migrations..."
yarn migrate || {
    echo "Warning: Migration failed. The app will start anyway."
    echo "Make sure the database is accessible and run 'yarn migrate' manually if needed."
}

echo "Starting application..."
exec node build/index.js
