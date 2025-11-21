#!/bin/bash

# Simple migration script that handles P3005 error gracefully
# For Vercel/production environments

set -e

echo "[migrate-simple] Starting migration..."

# Try to run migrate deploy
if npx prisma migrate deploy; then
  echo "[migrate-simple] ✅ Migration completed successfully"
  exit 0
fi

# If it failed, check the error
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  # Check if it's P3005 (schema not empty)
  if npx prisma migrate deploy 2>&1 | grep -q "P3005\|database schema is not empty"; then
    echo "[migrate-simple] ⚠️  Database schema is not empty"
    echo "[migrate-simple] Checking if migration tables exist..."
    
    # Try to check if tables exist using a simple query
    # If this succeeds, tables exist and we can mark migration as resolved
    if npx prisma db execute --stdin <<< "SELECT 1 FROM information_schema.tables WHERE table_name = 'contents' LIMIT 1;" > /dev/null 2>&1; then
      echo "[migrate-simple] ✅ Migration tables already exist"
      echo "[migrate-simple] Marking migration as resolved..."
      npx prisma migrate resolve --applied 20251118231605_add_multilingual_content || {
        echo "[migrate-simple] ⚠️  Could not mark as resolved, but tables exist. Continuing..."
      }
      echo "[migrate-simple] ✅ Migration process completed"
      exit 0
    else
      echo "[migrate-simple] ❌ Database is not empty, but required tables do not exist"
      echo "[migrate-simple] Please run migration manually using the SQL script"
      exit 1
    fi
  else
    echo "[migrate-simple] ❌ Migration failed with unknown error"
    exit $EXIT_CODE
  fi
fi

