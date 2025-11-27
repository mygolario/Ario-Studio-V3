#!/usr/bin/env node

/**
 * Script to deploy Sanity Studio
 * This script uses the Sanity CLI to deploy the studio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.SANITY_AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN || 'skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko';
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'dgwzv4lg';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

console.log('🚀 Starting Sanity Studio deployment...');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Host: ariostudio');

try {
  // Run sanity deploy with hostname
  console.log('\n📦 Deploying studio...');
  const output = execSync('npx sanity deploy --host ariostudio', {
    stdio: 'inherit',
    cwd: __dirname,
    env: process.env
  });
  
  console.log('\n✅ Studio deployment completed successfully!');
  console.log('🌐 Your studio should be available at: https://ariostudio.sanity.studio');
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n💡 If authentication is required, please run: npx sanity login');
  process.exit(1);
}

