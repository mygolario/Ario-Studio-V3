#!/usr/bin/env node

/**
 * Safe migration script for Vercel/production
 * 
 * This script:
 * 1. Tries to run prisma migrate deploy
 * 2. If it fails with P3005 (schema not empty), it checks if tables exist
 * 3. If tables exist, it marks the migration as resolved
 * 4. Otherwise, it fails with the original error
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MIGRATION_NAME = '20251118231605_add_multilingual_content';

function log(message) {
  console.log(`[migrate-safe] ${message}`);
}

function error(message) {
  console.error(`[migrate-safe] ERROR: ${message}`);
  process.exit(1);
}

function checkTablesExist() {
  try {
    // Try to query the database to see if tables exist
    // This is a simple check - if Prisma Client can connect, tables likely exist
    const result = execSync(
      'npx prisma db execute --stdin',
      {
        input: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name IN ('contents', 'content_translations')
          LIMIT 1;
        `,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }
    );
    return result.includes('contents') || result.includes('content_translations');
  } catch (e) {
    // If query fails, assume tables don't exist
    return false;
  }
}

function markMigrationAsResolved() {
  try {
    log(`Marking migration ${MIGRATION_NAME} as resolved...`);
    execSync(
      `npx prisma migrate resolve --applied ${MIGRATION_NAME}`,
      { stdio: 'inherit' }
    );
    log('✅ Migration marked as resolved');
    return true;
  } catch (e) {
    error(`Failed to mark migration as resolved: ${e.message}`);
    return false;
  }
}

function main() {
  log('Starting safe migration process...');

  // Step 1: Try to run migrate deploy
  try {
    log('Attempting prisma migrate deploy...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    log('✅ Migration completed successfully');
    return;
  } catch (e) {
    const errorOutput = e.stdout?.toString() || e.stderr?.toString() || e.message;
    
    // Check if it's the P3005 error (schema not empty)
    if (errorOutput.includes('P3005') || errorOutput.includes('database schema is not empty')) {
      log('⚠️  Database schema is not empty (P3005)');
      log('Checking if migration tables already exist...');
      
      // Check if the tables we need already exist
      if (checkTablesExist()) {
        log('✅ Migration tables already exist');
        log('Marking migration as resolved...');
        markMigrationAsResolved();
        log('✅ Migration process completed');
        return;
      } else {
        error('Database is not empty, but required tables do not exist. Please run migration manually.');
      }
    } else {
      // Some other error occurred
      error(`Migration failed: ${errorOutput}`);
    }
  }
}

main();

